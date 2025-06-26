import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/modules/product-management/products/infrastructure/schemas/product.schema';
import { generateOrderTrackingCode } from 'src/utils';

export type OrderDocument = HydratedDocument<Order>;

export class OrderCheckout extends Document {
  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: 0 })
  totalApplyDiscount: number;

  @Prop({ default: 0 })
  feeShip: number;

  @Prop({ default: 0 })
  grandTotal: number;
}

export class OrderShipping {
  @Prop({ required: true })
  street: string;
  @Prop({ required: true })
  ward: string;
  @Prop({ required: true })
  district: string;
  @Prop({ required: true })
  city: string;
}

export class OrderPayment extends Document {
  @Prop({ required: false })
  method: string;

  @Prop({ enum: ['pending', 'paid', 'failed'], default: 'pending' })
  status: string;
}

export class OrderProducts extends Document {
  @Prop({ ref: Product.name, type: Types.ObjectId, required: true })
  productId: Types.ObjectId;

  @Prop({ required: false })
  productName: string;

  @Prop({ required: false, min: 1 })
  quantity: number;

  @Prop({ required: false, min: 0 })
  price: number;

  @Prop({ required: false, min: 0 })
  discount: number;

  @Prop({ required: false, min: 0 })
  totalPrice: number;
}

@Schema({ timestamps: true, collection: 'Orders' })
export class Order extends Document {
  @Prop({ required: true })
  order_userId: string;

  @Prop()
  order_checkout: OrderCheckout;

  @Prop()
  order_shipping: OrderShipping;

  @Prop()
  order_payment: OrderPayment;

  @Prop()
  order_products: [OrderProducts];

  @Prop({ default: generateOrderTrackingCode })
  order_tracking: string;

  @Prop({
    enum: ['pending', 'confirmed', 'shipped', 'cancelled', 'delivered'],
    default: 'pending',
  })
  order_status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
