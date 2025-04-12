import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';

export type OrderDocument = HydratedDocument<Order>;

class OrderCheckout extends Document {
  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: 0 })
  totalApplyDiscount: number;

  @Prop({ default: 0 })
  feeShip: number;
}

class OrderShipping {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;
}

class OrderPayment extends Document {
  @Prop({ required: false })
  method: string;

  @Prop({ enum: ['pending', 'paid', 'failed'], default: 'pending' })
  status: string;
}

class OrderProducts extends Document {
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

  @Prop({ default: '#0000131052024' })
  order_tracking: string;

  @Prop({
    enum: ['pending', 'confirmed', 'shipped', 'cancelled', 'delivered'],
    default: 'pending',
  })
  order_status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
