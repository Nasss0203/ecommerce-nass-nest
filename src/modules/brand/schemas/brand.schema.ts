import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true, collection: 'brands' })
export class Brand extends Document {
  @Prop({ required: true, trim: true, unique: true })
  brand_name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
