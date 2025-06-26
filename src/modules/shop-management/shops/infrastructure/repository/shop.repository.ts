import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopRepositoryAbstract } from '../../domain/interface/repository/shop.repository.abstract';
import { Shop } from '../schemas/shop.schema';

@Injectable()
export class ShopRepository extends ShopRepositoryAbstract<Shop> {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {
    super(shopModel);
  }

  async create(data: Partial<Shop>, auth: string): Promise<Shop> {
    try {
      const exists = await this.shopModel.findOne({
        shop_slug: data.shop_slug,
      });

      if (exists) {
        throw new HttpException(
          'Shop with this slug already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newShop = new this.shopModel({
        ...data,
        owner_id: auth,
        shop_slug: data.shop_slug.toLowerCase(),
        status: 'active',
      });

      return await newShop.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create shop',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
