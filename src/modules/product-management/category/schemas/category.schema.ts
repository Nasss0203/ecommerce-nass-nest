import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

const COLLECTION_NAME = 'Categories';
@Schema({
  timestamps: true,
  collection: COLLECTION_NAME,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category extends Document {
  @Prop({ required: true, trim: true, unique: true })
  category_name: string;

  @Prop({ type: Types.ObjectId, ref: 'Shops', required: true })
  shop_id: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'product_category',
});
