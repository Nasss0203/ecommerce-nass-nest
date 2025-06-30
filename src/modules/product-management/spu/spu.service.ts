import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { omit } from 'lodash';
import { Model } from 'mongoose';
import { ShopRepository } from 'src/modules/shop-management/shops/infrastructure/repository/shop.repository';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { convertToObjectIdMongodb, randomProductId } from 'src/utils';
import { SkuService } from '../sku/sku.service';
import { CreateSpuDto } from './dto/create-spu.dto';
import { UpdateSpuDto } from './dto/update-spu.dto';
import { Spu } from './schemas/spu.schema';

@Injectable()
export class SpuService {
  constructor(
    @InjectModel(Spu.name) private spuModel: Model<Spu>,
    private skuService: SkuService,
    private readonly shopRepository: ShopRepository,
  ) {}
  async create(createSpuDto: CreateSpuDto, userId: IAuth) {
    const foundShip = await this.shopRepository.findShopById({
      id: userId.shop_id,
    });

    if (!foundShip) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    const newSpu = await this.spuModel.create({
      product_id: randomProductId(),
      product_auth: convertToObjectIdMongodb(userId._id),
      product_shop: convertToObjectIdMongodb(userId.shop_id),
      ...createSpuDto,
    });

    if (newSpu && createSpuDto.sku_list.length) {
      await this.skuService.create({
        spu_id: newSpu.product_id,
        sku_list: createSpuDto.sku_list,
      });
    }

    //4 sync data via elasticsearch (search.service)

    //5 response result object

    // return !!newSpu;
    return newSpu;
  }

  findAll() {
    return `This action returns all spu`;
  }

  async findOne({ spu_id }: { spu_id: string }) {
    try {
      const spu = await this.spuModel.findOne({
        product_id: spu_id,
        isPublished: true,
      });

      if (!spu) {
        throw new HttpException('Spu not found', HttpStatus.NOT_FOUND);
      }

      const skus = await this.skuService.findAll({
        product_id: spu.product_id,
      });

      if (!skus || skus.length === 0) {
        throw new HttpException(
          'No SKUs found for this SPU',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        spu_info: omit(spu, ['__v', 'updatedAt']),
        sku_list: skus.map((sku: any) =>
          omit(sku, ['__v', 'createdAt', 'updatedAt', 'isDeleted']),
        ),
      };
    } catch (error) {}
  }

  update(id: number, updateSpuDto: UpdateSpuDto) {
    return `This action updates a #${id} spu`;
  }

  remove(id: number) {
    return `This action removes a #${id} spu`;
  }
}
