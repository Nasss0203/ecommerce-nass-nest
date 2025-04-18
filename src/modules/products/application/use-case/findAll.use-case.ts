import { Injectable } from '@nestjs/common';
import { IQuery } from 'src/interfaces';
import { IResponse } from 'src/types';
import { ProductRepository } from '../../infrastructure/repository/product.repository';
import { Product } from '../../infrastructure/schemas/product.schema';

@Injectable()
export class FindAllProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(options: IQuery): Promise<IResponse<Product>[]> {
    const { category, brand, limit, page } = options;
    const query: Partial<IQuery> = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;

    return this.productRepository.findAll({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      query,
      filter: { isPublished: true },
    });
  }
}
