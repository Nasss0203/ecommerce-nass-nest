import { Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { ProductRepository } from '../../infrastructure/repository/product.repository';

@Injectable()
export class FindAllProductPublishUsecase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({
    product_auth,
    limit = 10,
    page = 1,
  }: {
    product_auth?: IAuth;
    limit?: number;
    page?: number;
  }) {
    const query = { product_auth };
    const filter = { isPublished: true };

    const product = await this.productRepository.findByPublishOrDraft({
      limit,
      page,
      query,
      filter,
    });
    return product;
  }
}
