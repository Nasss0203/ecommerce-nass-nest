import { Document, Model } from 'mongoose';
import { ISkuRepository } from '../sku.interface';

export abstract class SkuRepositoryAbstract<T extends Document>
  implements ISkuRepository<T>
{
  constructor(protected readonly model: Model<T>) {}
  async create(data: Partial<T>): Promise<T> {
    const response = new this.model({
      ...data,
    });
    return await response.save();
  }
}
