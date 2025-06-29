import { convertToObjectIdMongodb } from 'src/utils';
import { ProductEntity } from '../../domain/entities/products.entity';
import { Product } from '../../infrastructure/schemas/product.schema';

export function mapEntityToProductDocument(
  entity: ProductEntity,
): Partial<Product> {
  return {
    product_name: entity.product_name,
    product_thumb: entity.product_thumb,
    product_description: entity.product_description,
    product_price: entity.product_price,
    product_images: entity.product_images,
    product_slug: entity.product_slug,
    product_quantity: entity.product_quantity,
    product_category: convertToObjectIdMongodb(entity.product_category),
    product_brand: convertToObjectIdMongodb(entity.product_brand),
    product_attributes: entity.product_attributes,
    product_ratingAverage: entity.product_ratingAverage,
    product_variations: entity.product_variations,
    isDraft: entity.isDraft,
    isPublished: entity.isPublished,
    product_auth: convertToObjectIdMongodb(entity.product_auth),
  };
}
