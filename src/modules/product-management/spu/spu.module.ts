import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkuModule } from '../sku/sku.module';
import { Spu, SpuSchema } from './schemas/spu.schema';
import { SpuController } from './spu.controller';
import { SpuService } from './spu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spu.name, schema: SpuSchema }]),
    SkuModule,
  ],
  controllers: [SpuController],
  providers: [SpuService],
})
export class SpuModule {}
