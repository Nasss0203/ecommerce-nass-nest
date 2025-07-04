import { Injectable } from '@nestjs/common';
import { SkuService } from 'src/modules/product-management/sku/sku.service';
import { SpuEntity } from '../../domain/entities/spu.entity';
import { SpuCreateRepository } from '../../infrastructure/repository/spu-create.repository';
import { CreateSpuDto } from '../dto/create-spu.dto';
import { mapCreateSpuDtoToEntity } from '../mappers/spu.mapper';

@Injectable()
export class SpuCreateUseCase {
  constructor(
    private readonly spuCreateRepository: SpuCreateRepository,
    private readonly skuService: SkuService,
  ) {}

  async execute({
    createSpuDto,
    auth,
    shopId,
  }: {
    createSpuDto: CreateSpuDto;
    auth: string;
    shopId: string;
  }) {
    try {
      const spuEntity = SpuEntity.create({
        product_id: createSpuDto.product_id,
        product_name: createSpuDto.product_name,
        product_thumb: createSpuDto.product_thumb,
        product_description: createSpuDto.product_description,
        product_price: createSpuDto.product_price,
        product_images: createSpuDto.product_images,
        product_slug: createSpuDto.product_slug,
        product_quantity: createSpuDto.product_quantity,
        product_category: createSpuDto.product_category,
        product_brand: createSpuDto.product_brand,
        product_attributes: createSpuDto.product_attributes,
        product_ratingAverage: createSpuDto.product_ratingAverage,
        product_variations: createSpuDto.product_variations,
        isDraft: createSpuDto.isDraft,
        isPublished: createSpuDto.isPublished,
        product_auth: auth,
        product_shop: shopId,
        isDeleted: createSpuDto.isDeleted,
        sku_list: createSpuDto.sku_list,
      });

      const spuData = mapCreateSpuDtoToEntity(spuEntity);

      const newSpu = await this.spuCreateRepository.create(
        spuData,
        auth,
        shopId,
      );

      if (spuData.sku_list && createSpuDto.sku_list.length > 0) {
        const dataSku = await this.skuService.create({
          spu_id: newSpu.product_id,
          sku_list: createSpuDto.sku_list,
        });
      }

      return newSpu;
    } catch (error) {
      throw new Error(`Failed to create SPU: ${error.message}`);
    }
  }
}
