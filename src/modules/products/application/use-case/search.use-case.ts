import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repository/product.repository';

@Injectable()
export class SearchProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ key }: { key: string }) {
    return await this.productRepository.search({
      isPublished: true,
      $text: { $search: key },
    });
  }
}
