import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

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
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'product_category',
});
