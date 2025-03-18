import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './schemas/token.schema';

@Injectable()
export class TokensService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  async create(createTokenDto: CreateTokenDto) {
    const findToken = await this.tokenModel.findOne({
      userId: createTokenDto.userId,
    });

    if (findToken) {
      return await this.updateRefreshToken(
        createTokenDto.userId.toString(),
        createTokenDto.refreshToken,
      );
    } else {
      return await this.tokenModel.create(createTokenDto);
    }
  }

  findAll() {
    return `This action returns all tokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(userId: string, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${userId} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    return await this.tokenModel.findOneAndUpdate(
      { userId: userId },
      { refreshToken: refreshToken, refreshTokensUsed: [] },
      { upsert: true, new: true },
    );
  }
}
