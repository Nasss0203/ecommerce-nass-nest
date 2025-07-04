import { Document, Model } from 'mongoose';
import { ISpuRepository } from '../spu.interface';

export abstract class SpuRepositoryAbstract<T extends Document>
  implements ISpuRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  create(data: Partial<T>, auth: string, shopId: string): Promise<T> {
    const response = new this.model({
      ...data,
      product_auth: auth,
      product_shop: shopId,
    });

    return response.save();
  }
}
