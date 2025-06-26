import { HttpException, HttpStatus } from '@nestjs/common';

export class ShopValidator {
  constructor() {}

  static validateShopSlug(shopSlug: string): void {
    if (!shopSlug) {
      throw new HttpException(
        'Product name must be at least 3 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
