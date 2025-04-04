import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoryModule } from './modules/category/category.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { DatabaseModule } from './modules/database/database.module';
import { DiscountModule } from './modules/discount/discount.module';
import { FileModule } from './modules/file/file.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { MailModule } from './modules/mail/mail.module';
import { OrderModule } from './modules/order/order.module';
import { ProductsModule } from './modules/products/products.module';
import { RevenueModule } from './modules/revenue/revenue.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { SpuModule } from './modules/spu/spu.module';
import { SkuModule } from './modules/sku/sku.module';

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
