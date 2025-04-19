import { Injectable } from '@nestjs/common';
import { InventoryService } from 'src/modules/inventory/inventory.service';
import { convertToObjectIdMongodb } from 'src/utils';
import { ProductEntity } from '../../domain/entities/products.entity';
import { ProductValidator } from '../../domain/validators/product.validator';
import { ProductRepository } from '../../infrastructure/repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { mapEntityToProductDocument } from '../mappers/product.mapper';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private inventoryService: InventoryService,
    private productValidator: ProductValidator,
  ) {}

  async execute(createProductDto: CreateProductDto, userId: string) {
    ProductValidator.validateProductName(createProductDto.product_name);
    ProductValidator.validateProductPrice(createProductDto.product_price);
    ProductValidator.validateProductQuantity(createProductDto.product_quantity);

    await this.productValidator.validateCategory(
      createProductDto.product_category,
    );
    await this.productValidator.validateBrand(createProductDto.product_brand);

    const productEntity = ProductEntity.create({
      product_name: createProductDto.product_name,
      product_thumb: createProductDto.product_thumb,
      product_description: createProductDto.product_description,
      product_price: createProductDto.product_price,
      product_images: createProductDto.product_images,
      product_slug: createProductDto.product_slug,
      product_quantity: createProductDto.product_quantity,
      product_category: createProductDto.product_category,
      product_brand: createProductDto.product_brand,
      product_attributes: createProductDto.product_attributes,
      product_ratingAverage: createProductDto.product_ratingAverage,
      product_variations: createProductDto.product_variations,
      isDraft: createProductDto.isDraft,
      isPublished: createProductDto.isPublished,
      product_auth: userId,
    });

    const productData = mapEntityToProductDocument(productEntity);

    const savedProduct = await this.productRepository.create(
      productData,
      userId,
    );

    if (savedProduct) {
      await this.inventoryService.create({
        inventory_productId: convertToObjectIdMongodb(savedProduct._id),
        inventory_authId: convertToObjectIdMongodb(savedProduct.product_auth),
        inventory_stock: savedProduct.product_quantity,
        inventory_location: 'unknown',
        inventory_reservations: [],
      });
    }

    return savedProduct;
  }
}
