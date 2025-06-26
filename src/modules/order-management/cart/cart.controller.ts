import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  Auth,
  ResponseMessage,
} from 'src/common/decorator/customize.decorator';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: any) {
    return this.cartService.createCart(createCartDto);
  }

  @Get()
  @ResponseMessage('Get list cart')
  findAll(@Auth() auth: IAuth) {
    return this.cartService.findCart(auth._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Post('update')
  update(@Body() createCartDto: any) {
    return this.cartService.updateCart(createCartDto);
  }

  @Delete('')
  remove(@Body() createCartDto: any) {
    return this.cartService.deleteCart(createCartDto);
  }
}
