import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { RoleAuth } from 'src/constants';
import { convertToObjectIdMongodb } from 'src/utils';
import { Token } from '../tokens/schemas/token.schema';
import { TokensService } from '../tokens/tokens.service';
import { IAuth } from './auth.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { getHashPassword } from './repo/index.repo';
import { Auth } from './schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private tokenService: TokensService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const existingAuth = await this.authModel
      .findOne({ email: createAuthDto.email })
      .lean();

    if (existingAuth) {
      throw new HttpException(
        'Auth already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = getHashPassword(createAuthDto.password);

    const auth = await this.authModel.create({
      ...createAuthDto,
      password: hashPassword,
      roles: [RoleAuth.ADMIN],
    });

    const { _id, username, email, verify, roles } = auth;

    return { _id, username, email, verify, roles };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: string) {
    return this.authModel.findOne({ _id: id });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  findOneByEmail(email: string) {
    console.log(' email~', email);
    return this.authModel.findOne({
      email: email,
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findOneByEmail(email);
    if (user) {
      const isValid = this.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async login(user: IAuth, response: Response) {
    const { _id, username, email, roles } = user;
    const payload = {
      _id,
      username,
      email,
      roles,
    };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.createRefreshToken(payload);

    if (!refresh_token) {
      throw new Error('Failed to generate refresh token');
    }

    const dataa = await this.tokenService.create({
      userId: convertToObjectIdMongodb(_id),
      refreshToken: refresh_token,
      refreshTokensUsed: [],
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 259200000,
      path: '',
    });

    return {
      _id,
      username,
      email,
      roles,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }

  createRefreshToken = (payload: any) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),
    });
    return refreshToken;
  };

  async refreshToken(request: Request, response: Response) {
    const refresh_token = request.cookies['refresh_token'];
    console.log('refresh_token from cookie:', refresh_token);

    if (!refresh_token) {
      throw new HttpException(
        'No refresh token provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const tokenDoc = await this.tokenService.findOne(refresh_token);
      console.log('Token document:', tokenDoc);
      if (!tokenDoc) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { _id, username, email, roles } = decoded;
      const payload = { _id, username, email, roles };

      const newRefreshToken = this.createRefreshToken(payload);

      await this.tokenService.update({
        refreshToken: newRefreshToken,
        refreshTokensUsed: refresh_token,
      });

      response.clearCookie('refresh_token');
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        maxAge: 259200000,
        path: '',
      });

      const newAccessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE') || '1h',
      });

      return {
        _id,
        username,
        email,
        roles,
        tokens: {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
        },
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(user: IAuth, response: Response) {
    await this.tokenService.updateAuthToken('', user._id.toString());
    response.clearCookie('refresh_token');
  }
}
