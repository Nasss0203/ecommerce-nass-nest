import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as SchemaTypes } from 'mongoose';
import { Brand } from 'src/modules/brand/schemas/brand.schema';
import { Category } from 'src/modules/category/schemas/category.schema';

export type AuthDocument = HydratedDocument<Product>;
const COLLECTION_NAME = 'Products';

@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Product extends Document {
  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_thumb: string;

  @Prop()
  product_description: string;

  @Prop({ required: true })
  product_price: Number;

  @Prop({ default: [''] })
  product_images: [String];

  @Prop()
  product_slug: String;

  @Prop({ required: true })
  product_quantity: Number;

  @Prop({
    required: true,
    type: SchemaTypes.Types.ObjectId,
    ref: Category.name,
  })
  product_category: SchemaTypes.Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.Types.ObjectId, ref: Brand.name })
  product_brand: SchemaTypes.Types.ObjectId;

  @Prop({ type: SchemaTypes.Types.Mixed, default: {} })
  product_attributes: Record<string, any>;

  @Prop({ required: true, type: SchemaTypes.Types.ObjectId, ref: 'Auth' })
  product_auth: SchemaTypes.Types.ObjectId;

  @Prop({
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be above 5.0'],
  })
  product_ratingAverage: Number;
  @Prop({ default: [] })
  product_varations: [];

  @Prop({ default: true, index: true, select: false })
  isDraft: Boolean;

  @Prop({ default: false, index: true, select: false })
  isPublished: Boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
