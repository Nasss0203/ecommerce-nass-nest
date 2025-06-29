import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ActionDraftProductUsecase } from './application/use-case/action-draft.use-case';
import { ActionPublishProductUsecase } from './application/use-case/action-publish.use-case';
import { CreateProductUseCase } from './application/use-case/create.use-case';
import { DeleteProductUsecase } from './application/use-case/delete.use-case';
import { FindAllProductDraftUsecase } from './application/use-case/findAll-draft.use-case';
import { FindAllProductPublishUsecase } from './application/use-case/findAll-publish.use-case';
import { FindAllProductUsecase } from './application/use-case/findAll.use-case';
import { FindOneProductUsecase } from './application/use-case/findOne.use-case';
import { QueryProductUsecase } from './application/use-case/query.use-case';
import { SearchProductUsecase } from './application/use-case/search.use-case';
import { UpdateProductUsecase } from './application/use-case/update.use-case';
import { ProductValidator } from './domain/validators/product.validator';
import { ProductCreateRepository } from './infrastructure/repository/product-create.repository';
import { ProductRepository } from './infrastructure/repository/product.repository';
import {
  Product,
  ProductSchema,
} from './infrastructure/schemas/product.schema';
import { ProductsController } from './presentation/controllers/products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    InventoryModule,
    CategoryModule,
    BrandModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    ProductCreateRepository,
    CreateProductUseCase,
    DeleteProductUsecase,
    FindAllProductUsecase,
    FindOneProductUsecase,
    ActionPublishProductUsecase,
    ActionDraftProductUsecase,
    QueryProductUsecase,
    UpdateProductUsecase,
    SearchProductUsecase,
    FindAllProductDraftUsecase,
    FindAllProductPublishUsecase,
    ProductValidator,
  ],
  exports: [
    ProductRepository,
    ProductsService,
    FindOneProductUsecase,
    ProductCreateRepository,
  ],
})
export class ProductsModule {}
