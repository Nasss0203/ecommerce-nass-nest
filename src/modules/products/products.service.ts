import { Injectable } from '@nestjs/common';
import { IQuery } from 'src/types';
import { IAuth } from '../auth/auth.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto, userId: IAuth) {
    return await this.productRepository.createProduct(createProductDto, userId);
  }

  async publishProduct({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: IAuth;
  }) {
    return await this.productRepository.pulishProduct({
      product_id,
      product_auth,
    });
  }

  async unPublishProduct({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: IAuth;
  }) {
    return await this.productRepository.unPulishProduct({
      product_id,
      product_auth,
    });
  }

  async findAllProduct({
    limit = 10,
    page = 1,
    filter = { isPublished: true },
    query,
  }: {
    limit?: number;
    page?: number;
    filter: { isPublished: boolean };
    query?: IQuery;
  }) {
    return await this.productRepository.findAllProduct({
      limit,
      page,
      filter,
      query,
    });
  }

  async findAllProductPublish({
    product_auth,
    limit = 10,
    page = 1,
  }: {
    product_auth?: IAuth;
    limit?: number;
    page?: number;
  }) {
    const query: IQuery = { product_auth, isPublished: true };

    const product = await this.productRepository.findAllProductPublish({
      limit,
      page,
      query,
    });
    return product;
  }

  async findAllProductDraft({
    product_auth,
    limit = 10,
    page = 1,
  }: {
    product_auth?: IAuth;
    limit?: number;
    page?: number;
  }) {
    const query: IQuery = { product_auth, isDraft: true };

    const product = await this.productRepository.findAllProductDraft({
      limit,
      page,
      query,
    });
    return product;
  }

  async searchProduct({ key }: { key: string }) {
    return await this.productRepository.searchProduct({ key });
  }

  async findOne(id: string) {
    return await this.productRepository.findOneProduct(id);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    auth: IAuth,
  ) {
    const pro = await this.productRepository.updateProduct({
      id,
      updateProductDto,
      auth,
    });
    return pro;
  }

  async removeProduct(id: string, auth: IAuth) {
    return await this.productRepository.removeProduct({ product_id: id, auth });
  }
}
