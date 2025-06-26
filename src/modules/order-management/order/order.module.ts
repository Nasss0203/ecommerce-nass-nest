import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/user-management/auth/auth.module';
import { MailModule } from '../../system-support/mail/mail.module';
import { CartModule } from '../cart/cart.module';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';
import { CheckoutModule } from '../checkout/checkout.module';
import {
  Checkout,
  CheckoutSchema,
} from '../checkout/infrastructure/schemas/checkout.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repo/order.repository';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Checkout.name, schema: CheckoutSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
    CheckoutModule,
    AuthModule,
    CartModule,
    MailModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
