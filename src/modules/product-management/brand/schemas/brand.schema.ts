import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/modules/product-management/category/schemas/category.schema';

export type BrandDocument = HydratedDocument<Brand>;
const COLLECTION_NAME = 'Brands';

@Schema({
  timestamps: true,
  collection: COLLECTION_NAME,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Brand extends Document {
  @Prop({ required: true, trim: true, unique: true })
  brand_name: string;

  @Prop({ required: true, ref: Category.name, type: Types.ObjectId })
  categories: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Shops' })
  shop_id: Types.ObjectId;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'product_brand',
});
