import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEMPLATES } from 'src/constants';
import { CheckoutRepository } from 'src/modules/order-management/checkout/infrastructure/repository/checkout.repository';
import { Checkout } from 'src/modules/order-management/checkout/infrastructure/schemas/checkout.schema';
import { MailService } from 'src/modules/system-support/mail/mail.service';
import { AuthService } from 'src/modules/user-management/auth/auth.service';
import { Cart } from '../../cart/schemas/cart.schema';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Checkout.name) private checkoutModel: Model<Checkout>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly checkoutRepo: CheckoutRepository,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  async createOrderByUser({ checkoutId, userId, cartId, user_address = {} }) {
    const findCheckout = await this.checkoutRepo.findOneCheckout(checkoutId);

    if (!findCheckout)
      throw new HttpException('Checkout not found', HttpStatus.NOT_FOUND);

    const newOrder = await this.orderModel.create({
      order_userId: userId,
      order_checkout: {
        feeShip: 0,
        totalApplyDiscount: findCheckout.checkout_discount,
        totalPrice: findCheckout.checkout_totalPrice,
        grandTotal:
          findCheckout.checkout_totalPrice - findCheckout.checkout_discount,
      },
      order_shipping: user_address,
      order_payment: findCheckout.checkout_paymentStatus,
      order_products: findCheckout.checkout_items,
    });

    if (newOrder) {
      await this.cartModel.deleteOne({ _id: cartId });
      await this.checkoutModel.deleteOne({ _id: checkoutId });
      const findAuth = await this.authService.findOne(userId);

      const productItems = newOrder.order_products;

      if (findAuth) {
        await this.mailService.sendEmail({
          template: TEMPLATES.ORDER,
          email: findAuth.email,
          name: findAuth.username,
          products: productItems,
          orderId: newOrder.order_tracking,
          orderDate: '02/03/2003',
          orderPayment: 'COD',
          orderGrandTotal: newOrder.order_checkout.grandTotal,
          orderTotal: newOrder.order_checkout.totalPrice,
          feeShip: newOrder.order_checkout.feeShip,
          totalApplyDiscount: newOrder.order_checkout.totalApplyDiscount,
        });
      }
    }

    return newOrder;
  }

  async getAllOrderByUser(userId: string) {
    return await this.orderModel.find({ order_userId: userId }).lean();
  }

  async getOneOrder(orderId: string) {
    return await this.orderModel.findOne({ _id: orderId }).lean();
  }
}
