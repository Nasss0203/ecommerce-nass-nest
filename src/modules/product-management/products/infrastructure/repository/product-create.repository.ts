import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { convertToObjectIdMongodb } from 'src/utils';
import { ProductRepositoryAbstract } from '../../domain/interface/repositories/product.repository.abstract';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductCreateRepository extends ProductRepositoryAbstract<Product> {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel);
  }

  /**
   * Creates a new product.
   *
   * @param data - The product data to be created.
   * @param product_auth - The ID of the authenticated user creating the product.
   * @param product_shop - The ID of the shop associated with the product.
   * @returns The created product document.
   */
  async create(
    data: Partial<Product>,
    product_auth: string,
    product_shop: string,
  ): Promise<Product> {
    try {
      const newProduct = new this.productModel({
        ...data,
        product_auth: convertToObjectIdMongodb(product_auth),
        product_shop: convertToObjectIdMongodb(product_shop),
        product_category: convertToObjectIdMongodb(data.product_category),
        product_brand: convertToObjectIdMongodb(data.product_brand),
      });

      return await newProduct.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
