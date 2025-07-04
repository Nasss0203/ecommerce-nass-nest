import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkuService } from 'src/modules/product-management/sku/sku.service';
import { ShopRepository } from 'src/modules/shop-management/shops/infrastructure/repository/shop.repository';
import { randomProductId } from 'src/utils';
import { SpuRepositoryAbstract } from '../../domain/interface/repositories/spu.repository.abstract';
import { Spu } from '../schemas/spu.schema';

@Injectable()
export class SpuCreateRepository extends SpuRepositoryAbstract<Spu> {
  constructor(
    @InjectModel(Spu.name) private readonly spuModel: Model<Spu>,
    private readonly shopRepository: ShopRepository,
    private readonly skuService: SkuService,
  ) {
    super(spuModel);
  }

  async create(data: Partial<Spu>, auth: string, shopId: string): Promise<Spu> {
    try {
      const foundShop = await this.shopRepository.findShopById({
        id: shopId,
      });

      if (!foundShop) {
        throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
      }

      const newSpu = new this.spuModel({
        ...data,
        product_auth: auth,
        product_shop: shopId,
        product_id: randomProductId(),
      });

      return await newSpu.save();
    } catch (error) {}
  }
}
