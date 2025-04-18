import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BrandService } from 'src/modules/brand/brand.service';
import { CategoryService } from 'src/modules/category/category.service';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { convertToObjectIdMongodb } from 'src/utils';
import { ProductRepository } from '../../infrastructure/repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private brandService: BrandService,
  ) {}

  async execute(createProductDto: CreateProductDto, userId: string) {
    const category = await this.categoryService.findOne(
      createProductDto.product_category,
    );
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const brand = await this.brandService.findOne(
      createProductDto.product_brand,
    );
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.productRepository.create(
      {
        ...createProductDto,
        product_category: convertToObjectIdMongodb(
          createProductDto.product_category,
        ),
        product_brand: convertToObjectIdMongodb(createProductDto.product_brand),
      },
      userId,
    );

    if (product) {
      await this.inventoryService.create({
        inventory_productId: convertToObjectIdMongodb(product._id),
        inventory_authId: convertToObjectIdMongodb(product.product_auth),
        inventory_stock: product.product_quantity,
        inventory_location: 'unknow',
        inventory_reservations: [],
      });
    }

    return product;
  }
}
