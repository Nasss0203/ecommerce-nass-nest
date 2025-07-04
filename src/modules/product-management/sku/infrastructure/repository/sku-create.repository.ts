import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkuRepositoryAbstract } from '../../domain/interface/repositories/sku.repository.abstract';
import { Sku } from '../schemas/sku.schema';

@Injectable()
export class SkuCreateRepository extends SkuRepositoryAbstract<Sku> {
  constructor(@InjectModel(Sku.name) private skuModel: Model<Sku>) {
    super(skuModel);
  }
  create(data: Partial<Sku>): Promise<Sku> {
    return this.skuModel.create(data);
  }
}
