import { HttpException, HttpStatus } from '@nestjs/common';
import { BrandService } from 'src/modules/brand/brand.service';
import { CategoryService } from 'src/modules/category/category.service';

export class ProductValidator {
  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
  ) {}

  static validateProductName(productName: string): void {
    if (!productName || productName.length < 3) {
      throw new HttpException(
        'Product name must be at least 3 characters long',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static validateProductPrice(price: number): void {
    if (price <= 0) {
      throw new HttpException(
        'Product price must be greater than zero',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static validateProductQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new HttpException(
        'Product quantity cannot be negative',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateCategory(categoryId: string): Promise<void> {
    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  async validateBrand(brandId: string): Promise<void> {
    const brand = await this.brandService.findOne(brandId);
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
  }
}
