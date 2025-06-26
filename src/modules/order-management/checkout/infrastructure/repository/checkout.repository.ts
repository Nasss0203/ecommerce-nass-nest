import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/modules/order-management/cart/cart.service';
import { ProductRepository } from 'src/modules/product-management/products/infrastructure/repository/product.repository';
import { ICheckoutReview } from 'src/types';
import { convertToObjectIdMongodb } from 'src/utils';
import {
  CheckoutProductItemDto,
  CreateCheckoutDto,
} from '../../applications/dto/create-checkout.dto';
import { Checkout } from '../schemas/checkout.schema';

@Injectable()
export class CheckoutRepository {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<Checkout>,
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
  ) {}

  createCheckout(createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutModel.create(createCheckoutDto);
  }

  async findCheckoutByCart(authId: string) {
    return await this.checkoutModel.findOne({
      checkout_auth: authId,
    });
  }

  async findOneCheckout(id: string) {
    return await this.checkoutModel
      .findOne({ _id: convertToObjectIdMongodb(id) })
      .lean();
  }

  async reviewCheckout({ cartId, userId, order_ids }: ICheckoutReview) {
    const findCart = await this.cartService.findCart(userId);
    if (!findCart)
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);

    const checkout_order = {
      totalPrice: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalCheckout: 0,
    };

    const order_ids_input = order_ids;
    const checkoutItems = [];

    for (let i = 0; i < order_ids_input.length; i++) {
      const { userId, item_products }: any = order_ids_input[i];

      const checkoutProduct = await this.productRepository.checkProduct(
        item_products,
        findCart,
      );

      if (!checkoutProduct)
        throw new HttpException('Order wrong', HttpStatus.BAD_GATEWAY);

      const checkoutPrice = checkoutProduct.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      checkout_order.totalPrice += checkoutPrice;

      const itemsCheckout = {
        userId,
        priceRaw: checkoutPrice,
        priceApplyCheckout: checkoutPrice,
        item_products: checkoutProduct,
      };

      checkout_order.totalCheckout += itemsCheckout.priceApplyCheckout;

      checkoutItems.push(itemsCheckout);
    }

    const checkoutData: CreateCheckoutDto = {
      checkout_cart: cartId,
      checkout_auth: userId,
      checkout_items: checkoutItems.flatMap((item) => {
        return item.item_products.map((product: CheckoutProductItemDto) => ({
          productId: product.productId,
          quantity: product.quantity,
          image: product.thumb,
          price: product.price,
          name: product.name,
          discount:
            (item.priceRaw - item.priceApplyCheckout) /
            item.item_products.length,
          totalPrice:
            product.price * product.quantity -
            (item.priceRaw - item.priceApplyCheckout) /
              item.item_products.length,
        }));
      }),
      checkout_totalPrice: checkout_order.totalPrice,
      checkout_shippingFee: checkout_order.feeShip,
      checkout_discount: checkout_order.totalDiscount,
      checkout_grandTotal: checkout_order.totalCheckout,
      checkout_paymentStatus: 'pending',
    };

    let findCheckout = await this.findCheckoutByCart(
      checkoutData.checkout_auth,
    );

    let updatedOrCreateCheckout: any;

    if (findCheckout) {
      updatedOrCreateCheckout = await this.checkoutModel.findOneAndUpdate(
        { checkout_auth: userId },
        checkoutData,
        { new: true },
      );
    } else {
      updatedOrCreateCheckout = await this.createCheckout(checkoutData);
    }

    return updatedOrCreateCheckout;
  }
}
