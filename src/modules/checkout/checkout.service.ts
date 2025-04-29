import { Injectable } from '@nestjs/common';
import { UpdateCheckoutDto } from './applications/dto/update-checkout.dto';
import { CheckoutRepository } from './infrastructure/repository/checkout.repository';

@Injectable()
export class CheckoutService {
  constructor(private readonly checkoutRepository: CheckoutRepository) {}

  create({ cartId, order_ids, userId }) {
    return this.checkoutRepository.reviewCheckout({
      cartId,
      order_ids,
      userId,
    });
  }

  findAll() {
    return `This action returns all checkout`;
  }

  findOne(id: string) {
    return this.checkoutRepository.findOneCheckout(id);
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
}
