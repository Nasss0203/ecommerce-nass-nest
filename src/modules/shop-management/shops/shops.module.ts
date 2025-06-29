import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Auth,
  AuthSchema,
} from 'src/modules/user-management/auth/schemas/auth.schema';
import { CreateShopUseCase } from './application/use-case/create.use-case';
import { ShopRepository } from './infrastructure/repository/shop.repository';
import { Shop, ShopSchema } from './infrastructure/schemas/shop.schema';
import { ShopsController } from './presentation/controllers/shops.controller';
import { ShopsService } from './shops.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService, ShopRepository, CreateShopUseCase],
  exports: [ShopsService, ShopRepository],
})
export class ShopsModule {}
