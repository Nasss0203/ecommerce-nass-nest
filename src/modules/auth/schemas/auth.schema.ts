import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

const COLLECTION_NAME = 'Auths';
@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Auth {
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

  @Prop({ default: [] })
  roles: [];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);
