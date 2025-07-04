import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { omit } from 'lodash';
import { Model } from 'mongoose';
import { randomProductId } from 'src/utils';
import { UpdateSkuDto } from './applications/dto/update-sku.dto';
import { Sku } from './infrastructure/schemas/sku.schema';

@Injectable()
export class SkuService {
  constructor(@InjectModel(Sku.name) private skuModel: Model<Sku>) {}

  async create({ spu_id, sku_list }: { spu_id: string; sku_list: [] }) {
    const convert_sku_list = sku_list.map((sku: any) => {
      return {
        ...sku,
        product_id: spu_id,
        sku_id: `${spu_id}.${randomProductId()}`, // Generate a unique SKU ID
      };
    });

    const newSku = await this.skuModel.create(convert_sku_list);
    return newSku;
  }

  async findAll({ product_id }: { product_id?: string }) {
    try {
      //1. spu_id
      const skus = await this.skuModel.find({ product_id }).lean();
      return skus;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sku`;
  }

  async findOneSku({
    sku_id,
    product_id,
  }: {
    sku_id: string;
    product_id: string;
  }) {
    try {
      const sku = await this.skuModel
        .findOne({
          product_id,
          sku_id,
        })
        .lean();

      if (sku) {
        //cache sku to redis
      }

      const cleanSku = omit(sku, [
        '__v',
        'createdAt',
        'updatedAt',
        'isDeleted',
      ]);
      return cleanSku;
    } catch (error) {
      return null; // Handle error appropriately, maybe log it
    }
  }

  update(id: number, updateSkuDto: UpdateSkuDto) {
    return `This action updates a #${id} sku`;
  }

  remove(id: number) {
    return `This action removes a #${id} sku`;
  }
}
