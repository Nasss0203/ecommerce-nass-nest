import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsModule } from 'src/modules/shop-management/shops/shops.module';
import { Sku, SkuSchema } from './schemas/sku.schema';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sku.name, schema: SkuSchema }]),
    ShopsModule,
  ],
  controllers: [SkuController],
  providers: [SkuService],
  exports: [SkuService],
})
export class SkuModule {}
