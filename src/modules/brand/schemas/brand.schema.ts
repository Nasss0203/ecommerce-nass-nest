import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/modules/category/schemas/category.schema';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true, collection: 'Brands' })
export class Brand extends Document {
  @Prop({ required: true, trim: true, unique: true })
  brand_name: string;

  @Prop({ required: true, ref: Category.name, type: Types.ObjectId })
  categories: Types.ObjectId;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
