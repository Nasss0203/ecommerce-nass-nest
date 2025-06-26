import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountModule } from './modules/discount-management/discount/discount.module';
import { DatabaseModule } from './modules/infrastructure/database/database.module';
import { CartModule } from './modules/order-management/cart/cart.module';
import { CheckoutModule } from './modules/order-management/checkout/checkout.module';
import { OrderModule } from './modules/order-management/order/order.module';
import { BrandModule } from './modules/product-management/brand/brand.module';
import { CategoryModule } from './modules/product-management/category/category.module';
import { InventoryModule } from './modules/product-management/inventory/inventory.module';
import { ProductsModule } from './modules/product-management/products/products.module';
import { SkuModule } from './modules/product-management/sku/sku.module';
import { SpuModule } from './modules/product-management/spu/spu.module';
import { RevenueModule } from './modules/revenue-reporting/revenue/revenue.module';
import { FileModule } from './modules/system-support/file/file.module';
import { MailModule } from './modules/system-support/mail/mail.module';
import { AuthModule } from './modules/user-management/auth/auth.module';
import { TokensModule } from './modules/user-management/tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProductsModule,
    CategoryModule,
    BrandModule,
    InventoryModule,
    TokensModule,
    FileModule,
    CartModule,
    CheckoutModule,
    DiscountModule,
    OrderModule,
    RevenueModule,
    MailModule,
    DatabaseModule,
    SpuModule,
    SkuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
