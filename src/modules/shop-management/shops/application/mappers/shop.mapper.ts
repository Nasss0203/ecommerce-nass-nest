import { convertToObjectIdMongodb } from 'src/utils';
import { ShopEntity } from '../../domain/entities/shop.entity';
import { Shop } from '../../infrastructure/schemas/shop.schema';

export function mapEntityToShopDocument(entity: ShopEntity): Partial<Shop> {
  return {
    shop_name: entity.shop_name,
    shop_description: entity.shop_description,
    shop_slug: entity.shop_slug,
    logo_url: entity.logo_url,
    cover_image_url: entity.cover_image_url,
    owner_id: convertToObjectIdMongodb(entity.owner_id),
    status: entity.status,
  };
}
