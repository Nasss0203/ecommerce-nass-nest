import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopRepository } from 'src/modules/shop-management/shops/infrastructure/repository/shop.repository';
import { ShopsModule } from 'src/modules/shop-management/shops/shops.module';
import { SkuModule } from '../sku/sku.module';
import { Spu, SpuSchema } from './infrastructure/schemas/spu.schema';

import { SpuCreateUseCase } from './application/use-case/create.use-case';
import { SpuCreateRepository } from './infrastructure/repository/spu-create.repository';
import { SpuController } from './presentation/controllers/spu.controller';
import { SpuService } from './spu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spu.name, schema: SpuSchema }]),
    SkuModule,
    ShopsModule,
  ],
  controllers: [SpuController],
  providers: [
    SpuService,
    ShopRepository,
    SpuCreateRepository,
    SpuCreateUseCase,
  ],
})
export class SpuModule {}
