import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repository/product.repository';
import { FindOneProductUsecase } from './findOne.use-case';

@Injectable()
export class ActionDraftProductUsecase {
  constructor(
    private readonly productRepository: ProductRepository,
    private findOneProductUsecase: FindOneProductUsecase,
  ) {}

  async execute({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: string;
  }) {
    const productId = await this.findOneProductUsecase.execute(product_id);

    if (!productId)
      throw new HttpException(
        'Product not found | ActionDraftProductUsecase',
        HttpStatus.NOT_FOUND,
      );

    return await this.productRepository.actionDraft({
      product_id,
      product_auth,
    });
  }
}
