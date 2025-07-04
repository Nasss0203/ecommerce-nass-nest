import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Schema as SchemaTypes,
  Types,
} from 'mongoose';
import { Brand } from 'src/modules/product-management/brand/schemas/brand.schema';
import { Category } from 'src/modules/product-management/category/schemas/category.schema';
import { Shop } from 'src/modules/shop-management/shops/infrastructure/schemas/shop.schema';

export type SpuDocument = HydratedDocument<Spu>;
const COLLECTION_NAME = 'Spu';

@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Spu extends Document {
  @Prop({ default: '' })
  product_id: string;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_thumb: string;

  @Prop()
  product_description: string;

  @Prop({ required: true })
  product_price: number;

  @Prop({ default: [] })
  product_images: string[];

  @Prop()
  product_slug: string;

  @Prop({ required: true })
  product_quantity: number;

  @Prop({ required: true, type: Types.ObjectId, ref: Shop.name })
  product_shop: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Category.name,
  })
  product_category: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Brand.name })
  product_brand: Types.ObjectId;

  @Prop({ type: SchemaTypes.Types.Mixed, default: {} })
  product_attributes: Record<string, any>;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Auth' })
  product_auth: Types.ObjectId;

  @Prop({
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (v: number) => Math.round(v * 10) / 10, // Round to one decimal place
  })
  product_ratingAverage: number;

  @Prop({ default: [] })
  product_variations: any[];

  @Prop({ default: true, index: true, select: false })
  isDraft: boolean;

  @Prop({ default: false, index: true, select: false })
  isPublished: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: [] })
  sku_list: [];
}

export const SpuSchema = SchemaFactory.createForClass(Spu);
SpuSchema.index({ product_name: 'text', product_description: 'text' });
