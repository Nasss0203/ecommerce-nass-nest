import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;
const COLLECTION_NAME = 'Carts';

@Schema({ timestamps: true, collection: COLLECTION_NAME })
export class Cart {
  @Prop({ required: true, enum: ['active', 'completed', 'failed', 'pending'] })
  cart_state: string;

  @Prop({ required: true, default: [{}] })
  cart_products: [{}];

  @Prop({ default: 0 })
  cart_count_product: number;

  @Prop({ required: true })
  cart_userId: string;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
