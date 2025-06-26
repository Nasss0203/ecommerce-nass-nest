import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SkuDocument = HydratedDocument<Sku>;
const COLLECTION_NAME = 'Sku';

@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Sku extends Document {
  @Prop({ required: true, unique: true })
  sku_id: string;

  @Prop({ type: [], default: [0] })
  sku_tier_index: [];

  @Prop({ default: false })
  sku_default: boolean;

  @Prop({ default: '' })
  sku_slug: string;

  @Prop({ default: 0 })
  sku_sort: number;

  @Prop({ default: '', required: true })
  sku_price: string;

  @Prop({ default: 0 })
  sku_stock: number;

  @Prop({ default: '', required: true })
  product_id: string;

  @Prop({ default: true, index: true, select: false })
  isDraft: boolean;

  @Prop({ default: false, index: true, select: false })
  isPublished: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const SkuSchema = SchemaFactory.createForClass(Sku);
