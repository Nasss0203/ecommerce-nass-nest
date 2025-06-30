import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopRepository } from 'src/modules/shop-management/shops/infrastructure/repository/shop.repository';
import { ShopsModule } from 'src/modules/shop-management/shops/shops.module';
import { SkuModule } from '../sku/sku.module';
import { Spu, SpuSchema } from './schemas/spu.schema';
import { SpuController } from './spu.controller';
import { SpuService } from './spu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spu.name, schema: SpuSchema }]),
    SkuModule,
    ShopsModule,
  ],
  controllers: [SpuController],
  providers: [SpuService, ShopRepository],
})
export class SpuModule {}
