import { Types } from 'mongoose';

export class CheckoutProductItemDto {
  productId: Types.ObjectId;
  quantity: number;
  thumb: string;
  price: number;
  name: string;
  discount: number;
  totalPrice: number;
}

export class CreateCheckoutDto {
  checkout_cart: string;
  checkout_auth: string;
  checkout_items: CheckoutProductItemDto[];
  checkout_totalPrice?: number;
  checkout_shippingFee?: number;
  checkout_discount?: number;
  checkout_tax?: number;
  checkout_grandTotal?: number;
  checkout_paymentStatus?: string;
  checkout_paymentDetails?: object;
  checkout_notes?: string;
}
