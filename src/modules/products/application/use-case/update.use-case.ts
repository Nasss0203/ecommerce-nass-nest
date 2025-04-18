import { Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/auth/auth.interface';
import { ProductRepository } from '../../infrastructure/repository/product.repository';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUsecase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(id: string, updateProductDto: UpdateProductDto, auth: IAuth) {
    const pro = await this.productRepository.update({
      id,
      data: updateProductDto,
      auth,
    });
    return pro;
  }
}
