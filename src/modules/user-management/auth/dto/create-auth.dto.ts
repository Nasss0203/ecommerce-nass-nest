import { IsEmail, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  status: string;
  verify: boolean;
  roles: [string];
  phone: number;

  avatar: string;

  shop_id: Types.ObjectId;

  last_login_at: Date;
}
