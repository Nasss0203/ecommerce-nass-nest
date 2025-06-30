import { Document, Model } from 'mongoose';
import { IShopRepository } from '../shop.interface';

export abstract class ShopRepositoryAbstract<T extends Document>
  implements IShopRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>, auth: string): Promise<T> {
    const created = new this.model({ ...data, owner_id: auth });
    return await created.save();
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id).exec();
  }

  async findOne(key: Record<string, any>): Promise<T | null> {
    return await this.model.findOne(key).exec();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
