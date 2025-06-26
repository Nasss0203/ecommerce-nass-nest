import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/modules/product-management/products/products.module';
import { CartModule } from '../cart/cart.module';
import { CheckoutService } from './checkout.service';
import { CheckoutRepository } from './infrastructure/repository/checkout.repository';
import {
  Checkout,
  CheckoutSchema,
} from './infrastructure/schemas/checkout.schema';
import { CheckoutController } from './presentation/controllers/checkout.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    CartModule,
    ProductsModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutRepository],
  exports: [CheckoutRepository],
})
export class CheckoutModule {}
