import { Types } from 'mongoose';
export class CreateProductDto {
  product_name: string;

  product_thumb: string;

  product_description: string;

  product_price: number;

  product_images: [string];

  product_slug: string;

  product_quantity: number;

  product_category: string;

  product_brand: string;

  product_attributes: Record<string, any>;

  product_auth: Types.ObjectId;

  product_ratingAverage: number;

  product_variations: any[];

  isDraft: boolean;

  isPublished: boolean;
}
