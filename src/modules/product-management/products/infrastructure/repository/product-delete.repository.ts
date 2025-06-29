import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { convertToObjectIdMongodb } from 'src/utils';
import { ProductRepositoryAbstract } from '../../domain/interface/repositories/product.repository.abstract';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductDeleteRepository extends ProductRepositoryAbstract<Product> {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel);
  }

  /**
   *
   * @param param0 -  productId, auth
   * @returns
   */
  async delete({ id, auth }: { id: string; auth: string }): Promise<any> {
    const deleteProduct = await this.productModel.deleteOne({
      _id: convertToObjectIdMongodb(id),
      product_auth: convertToObjectIdMongodb(auth),
    });

    return deleteProduct;
  }
}
