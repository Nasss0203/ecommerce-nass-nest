import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ProductRepositoryAbstract } from '../../domain/interface/repositories/product.repository.abstract';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductSearchRepository extends ProductRepositoryAbstract<Product> {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel);
  }

  /**
   *
   * @param filter
   * @returns
   */
  async search(filter?: FilterQuery<Product>): Promise<Product[]> {
    const isTextSearch = filter?.$text !== undefined;

    const projection = isTextSearch
      ? { score: { $meta: 'textScore' } }
      : undefined;

    const sort = isTextSearch ? { score: { $meta: 'textScore' } } : undefined;

    return this.productModel.find(filter, projection).sort(sort).lean().exec();
  }
}
