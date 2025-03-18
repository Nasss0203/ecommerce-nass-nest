import { Types } from 'mongoose';

export class CreateTokenDto {
  userId: Types.ObjectId;
  refreshToken: string;
  refreshTokensUsed: string[];
  //   deviceInfo: string;
}
