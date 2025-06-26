import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomProductId } from 'src/utils';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { Sku } from './schemas/sku.schema';

@Injectable()
export class SkuService {
  constructor(@InjectModel(Sku.name) private skuModel: Model<Sku>) {}

  async create({ spu_id, sku_list }: { spu_id: string; sku_list: [] }) {
    const convert_sku_list = sku_list.map((sku: any) => {
      return {
        ...sku,
        product_id: spu_id,
        sku_id: `${spu_id}.${randomProductId()}`,
      };
    });

    const newSku = await this.skuModel.create(convert_sku_list);
    return newSku;
  }

  findAll() {
    return `This action returns all sku`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sku`;
  }

  update(id: number, updateSkuDto: UpdateSkuDto) {
    return `This action updates a #${id} sku`;
  }

  remove(id: number) {
    return `This action removes a #${id} sku`;
  }
}
