import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Schema as SchemaTypes,
  Types,
} from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

const COLLECTION_NAME = 'Auths';
@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Auth extends Document {
  @Prop({
    maxLength: [150, 'Name cannot exceed 150 characters'],
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required'],
  })
  username: string;

  @Prop({
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters long'],
  })
  password: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ default: false })
  verify: SchemaTypes.Types.Boolean;

  @Prop({
    type: [String],
    enum: ['admin', 'seller', 'user'],
    default: ['user'],
  })
  roles: ('admin' | 'seller' | 'user')[];

  @Prop({ default: 0 })
  phone: number;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ type: Types.ObjectId, ref: 'Shops', default: '' })
  shop_id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  last_login_at: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
