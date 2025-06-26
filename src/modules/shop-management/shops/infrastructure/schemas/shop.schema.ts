import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Shop>;
const COLLECTION_NAME = 'Shops';

@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Shop extends Document {
  @Prop({ required: true })
  shop_name: string;

  @Prop()
  shop_description: string;

  @Prop()
  shop_slug: string;

  @Prop()
  logo_url: string;

  @Prop({ default: [] })
  cover_image_url: string[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'Auth' })
  owner_id: Types.ObjectId;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
