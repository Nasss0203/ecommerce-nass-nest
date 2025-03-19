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
      return await this.tokenModel.findOneAndUpdate(
        { userId: createTokenDto.userId },
        { refreshToken: createTokenDto.refreshToken },
        { new: true },
      );
    } else {
      return await this.tokenModel.create(createTokenDto);
    }
  }

  findAll() {
    return `This action returns all tokens`;
  }

  async findOne(refreshToken: string) {
    return await this.tokenModel.findOne({ refreshToken: refreshToken });
  }

  async update(updateTokenDto: UpdateTokenDto) {
    const { refreshToken, refreshTokensUsed } = updateTokenDto;
    return await this.tokenModel.updateOne(
      // { userId: userId },
      {
        $set: {
          refreshToken: refreshToken,
        },
        $addToSet: {
          refreshTokensUsed: refreshTokensUsed,
        },
      },
    );
  }

  async updateRefreshToken({
    refreshToken,
    refreshTokensUsed,
  }: UpdateTokenDto) {}

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
