import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/utils';
import { ShopEntity } from '../../domain/entities/shop.entity';
import { ShopRepository } from '../../infrastructure/repository/shop.repository';
import { CreateShopDto } from '../dto/create-shop.dto';
import { mapEntityToShopDocument } from '../mappers/shop.mapper';

@Injectable()
export class CreateShopUseCase {
  constructor(private readonly shopRepository: ShopRepository) {}

  async execute(createShopDto: CreateShopDto, userId: string) {
    const slug = generateSlug(createShopDto.shop_name);
    const shopEntity = ShopEntity.create({
      shop_name: createShopDto.shop_name,
      shop_description: createShopDto.shop_description,
      shop_slug: slug,
      logo_url: createShopDto.logo_url,
      cover_image_url: createShopDto.cover_image_url,
      owner_id: userId,
      status: createShopDto.status,
    });
    console.log(' shopEntity~', shopEntity);

    const shopData = mapEntityToShopDocument(shopEntity);

    const savedShop = await this.shopRepository.create(shopData, userId);

    return savedShop;
  }
}
