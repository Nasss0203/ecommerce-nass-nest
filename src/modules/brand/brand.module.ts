import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from '../products/infrastructure/schemas/product.schema';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
