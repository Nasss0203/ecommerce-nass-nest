import { Document, FilterQuery, Model } from 'mongoose';
import { IAuth } from 'src/modules/auth/auth.interface';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { IProductRepository } from '../interface/product.interface';

export abstract class ProductRepositoryAbstract<T extends Document>
  implements IProductRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>, auth: string): Promise<T> {
    const response = new this.model({
      ...data,
      product_auth: auth,
    });
    return await response.save();
  }

  async findOne(id: string): Promise<T> {
    return await this.model.findOne({ _id: id });
  }

  async findAll(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }

  async findByPublishOrDraft(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }

  async actionPublish(payload: {
    product_id: string;
    product_auth: string;
  }): Promise<any> {
    return await this.model.updateOne(payload);
  }

  async actionDraft(payload: {
    product_id: string;
    product_auth: string;
  }): Promise<any> {
    return await this.model.updateOne(payload);
  }

  async search(filter?: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }

  async update({
    id,
    data,
    auth,
  }: {
    id: string;
    data: UpdateProductDto;
    auth: IAuth;
  }): Promise<T> {
    return await this.model.findByIdAndUpdate(id, data);
  }
  async delete({ id, auth }: { id: string; auth: string }): Promise<any> {
    const response = await this.model.deleteOne({
      _id: id,
      auth,
    });

    return response;
  }
}
