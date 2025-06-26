import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repository/product.repository';

@Injectable()
export class DeleteProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, auth: string) {
    return await this.productRepository.delete({ id, auth });
  }
}
