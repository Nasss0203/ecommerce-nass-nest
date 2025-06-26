import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IQueryAdvanced } from 'src/types';
import { convertToObjectIdMongodb } from 'src/utils';
import { ProductRepository } from '../../infrastructure/repository/product.repository';

@Injectable()
export class QueryProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(payload: IQueryAdvanced) {
    const { limit = 10, page = 1, sort, select, filter = {}, query } = payload;

    const skip = (page - 1) * limit;
    const { brand, category } = query;

    if (category) {
      try {
        filter.product_category = convertToObjectIdMongodb(category);
      } catch (error) {
        throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
      }
    }

    if (brand) {
      try {
        filter.product_brand = convertToObjectIdMongodb(brand);
      } catch (error) {
        throw new HttpException('Invalid brand ID', HttpStatus.BAD_REQUEST);
      }
    }

    return await this.productRepository.queryProduct({
      limit,
      skip,
      sort,
      filter,
      select,
    });
  }
}
