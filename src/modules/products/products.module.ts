import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ProductRepository } from './product.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    InventoryModule,
    CategoryModule,
    BrandModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductsModule {}
