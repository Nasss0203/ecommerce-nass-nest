import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';

export type CheckoutDocument = HydratedDocument<Checkout>;

class CheckoutProductItem extends Document {
  @Prop({ default: false })
  _id: boolean;

  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ required: true, min: 0 })
  totalPrice: number;
}

class CheckoutPaymentDetails extends Document {}

@Schema({ timestamps: true, collection: 'Checkouts' })
export class Checkout extends Document {
  @Prop({ required: true })
  checkout_cart: string;

  @Prop({ required: true })
  checkout_auth: string;

  @Prop()
  checkout_items: [CheckoutProductItem];

  @Prop({ required: true, min: 0 })
  checkout_totalPrice: number;

  // Phí vận chuyển
  @Prop({ default: 0 })
  checkout_shippingFee: number;

  // Tổng số tiền được giảm giá
  @Prop({ default: 0 })
  checkout_discount: number;

  // Thuế
  @Prop({ default: 0 })
  checkout_tax: number;

  @Prop({ required: true, min: 0 })
  checkout_grandTotal: number;

  // Phương thức vận chuyển
  // checkout_shippingMethod: { type: String, required: true },

  // checkout_shippingAddress: {
  // 	checkout_fullName: { type: String, required: true },
  // 	checkout_phoneNumber: { type: String, required: true },
  // 	checkout_addressLine1: { type: String, required: true },
  // 	checkout_city: { type: String, required: true },
  // 	checkout_state: { type: String, required: true },
  // 	checkout_postalCode: { type: String, required: true },
  // 	checkout_country: { type: String, required: true },
  // },

  // // Phương thức thanh toán
  // checkout_paymentMethod: { type: String, required: true },

  // Trạng thái thanh toán (pending, paid, failed)
  @Prop({ enum: ['pending', 'paid', 'failed'], default: 'pending' })
  checkout_paymentStatus: string;

  // Thông tin chi tiết về thanh toán (tùy thuộc vào phương thức thanh toán)

  @Prop()
  checkout_paymentDetails: CheckoutPaymentDetails;

  // Ghi chú của khách hàng
  @Prop()
  checkout_notes: string;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
