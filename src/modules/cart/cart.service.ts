import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { convertToObjectIdMongodb } from 'src/utils';
import { ProductsService } from '../products/products.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private productService: ProductsService,
  ) {}
  async createUserCart({
    userId,
    productId,
  }: {
    userId: string;
    productId: any;
  }) {
    const query = {
      cart_userId: userId,
      cart_state: 'active',
    };

    const updateOrInsert = {
      $addToSet: { cart_products: productId },
    };

    const options = { upsert: true, new: true };

    return await this.cartModel.findOneAndUpdate(
      query,
      updateOrInsert,
      options,
    );
  }

  async updateCartUserQuantity({
    userId,
    products,
  }: {
    userId: string;
    products: any;
  }) {
    const { productId, quantity } = products;
    const query = {
      cart_userId: userId,
      'cart_products.productId': productId,
      cart_state: 'active',
    };

    const updateSet = {
      $inc: {
        'cart_products.$.quantity': quantity,
      },
    };

    const updatePush = {
      $addToSet: {
        cart_products: products,
      },
    };

    const updatedCart = await this.cartModel.findOneAndUpdate(
      query,
      updateSet,
      { new: true },
    );

    if (!updatedCart) {
      return await this.cartModel.findOneAndUpdate(
        { cart_userId: userId, cart_state: 'active' },
        updatePush,
        { upsert: true, new: true },
      );
    }

    return updatedCart;
  }

  async createCart({ userId, products = {} }) {
    const userCart = await this.cartModel.findOne({
      cart_userId: userId,
    });

    if (!userCart) {
      return await this.createUserCart({
        userId: userId,
        productId: products,
      });
    }

    if (!userCart.cart_products.length) {
      userCart.cart_products = [products];
      return await userCart.save();
    }

    return await this.updateCartUserQuantity({ userId, products });
  }

  async updateCart({ userId, item_products }) {
    const { productId, quantity, old_quantity } = item_products[0];

    const fonudProduct = await this.productService.findOne(productId);
    if (!fonudProduct)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    if (quantity === 0) {
      await this.cartModel.updateOne(
        { cart_userId: userId },
        { $pull: { cart_products: { productId } } },
      );
      return { message: 'Product removed from cart' };
    }
    return await this.updateCartUserQuantity({
      userId,
      products: {
        productId,
        quantity: quantity - old_quantity,
      },
    });
  }

  findAll() {
    return `This action returns all cart`;
  }

  async findCart(userId: string) {
    return await this.cartModel
      .findOne({
        cart_userId: convertToObjectIdMongodb(userId),
        cart_state: 'active',
      })
      .lean();
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  removeCart(id: number) {
    return `This action removes a #${id} cart`;
  }

  async deleteCart({ userId, productId }) {
    const query = { cart_userId: userId, cart_state: 'active' },
      updateSet = {
        $pull: {
          cart_products: {
            productId,
          },
        },
      };
    const deleteCart = await this.cartModel.updateOne(query, updateSet);
    return deleteCart;
  }
}
