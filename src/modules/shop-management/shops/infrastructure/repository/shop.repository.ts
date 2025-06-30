import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/modules/user-management/auth/schemas/auth.schema';
import { ShopRepositoryAbstract } from '../../domain/interface/repository/shop.repository.abstract';
import { Shop } from '../schemas/shop.schema';

const selectStruct = {
  email: 1,
  name: 1,
  status: 1,
  roles: 1,
};

@Injectable()
export class ShopRepository extends ShopRepositoryAbstract<Shop> {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<Shop>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {
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

      if (newShop) {
        await this.authModel.updateOne(
          {
            _id: auth,
          },
          {
            $set: { shop_id: newShop._id },
            $addToSet: { roles: 'seller' },
          },
        );
      }

      return await newShop.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create shop',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findShopById({
    id,
    select = selectStruct,
  }: {
    id: string;
    select?: any;
  }): Promise<Shop | null> {
    try {
      const shop = await this.shopModel.findById(id).select(select).exec();

      if (!shop) {
        throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
      }
      return shop;
    } catch (error) {
      throw new HttpException(
        'Failed to find shop',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
