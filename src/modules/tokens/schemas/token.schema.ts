import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';

const COLLECTION = 'Tokens';
@Schema({ timestamps: true, collection: COLLECTION })
export class Token extends Document {
  @Prop({
    type: SchemaType.Types.ObjectId,
    required: true,
    ref: 'Auth',
    unique: true,
  })
  userId: SchemaType.Types.ObjectId;

  @Prop({ type: String, required: true })
  refreshToken: string;

  @Prop({ type: [String], default: [] })
  refreshTokensUsed: [string];

  // @Prop({ type: String, default: '' })
  // deviceInfo: string;

  //   async compareRefreshToken(token: string): Promise<boolean> {
  //     return bcrypt.compare(token, this.refreshToken);
  //   }
}

export const TokenSchema = SchemaFactory.createForClass(Token);
