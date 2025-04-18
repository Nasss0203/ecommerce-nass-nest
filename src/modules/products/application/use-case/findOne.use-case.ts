import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repository/product.repository';

@Injectable()
export class FindOneProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(id: string) {
    return await this.productRepository.findOne(id);
  }
}
