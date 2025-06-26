import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repo/order.repository';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async createOrderByUser({ checkoutId, userId, cartId, user_address }) {
    return this.orderRepository.createOrderByUser({
      checkoutId,
      userId,
      cartId,
      user_address,
    });
  }

  async findAll(userId: string) {
    return await this.orderRepository.getAllOrderByUser(userId);
  }

  async findOne(id: string) {
    return await this.orderRepository.getOneOrder(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
