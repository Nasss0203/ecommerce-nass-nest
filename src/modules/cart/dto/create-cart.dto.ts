import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  cart_state: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartProductDto)
  cart_products: CartProductDto[];

  @IsNotEmpty()
  @IsNumber()
  cart_count_product: number;

  @IsNotEmpty()
  @IsString()
  cart_userId: string;
}

class CartProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
