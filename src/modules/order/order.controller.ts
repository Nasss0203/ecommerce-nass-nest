import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Auth, ResponseMessage } from 'src/common/customize';
import { IAuth } from '../auth/auth.interface';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ResponseMessage('Create order successfully')
  create(@Req() req: Request) {
    return this.orderService.createOrderByUser(req.body);
  }

  @Get('all')
  @ResponseMessage('Get all order by user')
  findAll(@Auth() auth: IAuth) {
    return this.orderService.findAll(auth._id);
  }

  @Get(':id')
  @ResponseMessage('Get one order by user')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
