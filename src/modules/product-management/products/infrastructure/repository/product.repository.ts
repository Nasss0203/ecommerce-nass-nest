import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { IQueryAdvanced } from 'src/types';
import { convertToObjectIdMongodb } from 'src/utils';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { ProductRepositoryAbstract } from '../../domain/interface/repositories/product.repository.abstract';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductRepository extends ProductRepositoryAbstract<Product> {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel);
  }

  /**
   * Creates a new product.
   *
   * @param data - The product data to be created.
   * @param product_auth - The ID of the authenticated user creating the product.
   * @returns The created product document.
   */
  async create(data: Partial<Product>, product_auth: string): Promise<Product> {
    try {
      const newProduct = new this.productModel({
        ...data,
        product_auth: convertToObjectIdMongodb(product_auth),
        product_category: convertToObjectIdMongodb(data.product_category),
        product_brand: convertToObjectIdMongodb(data.product_brand),
      });

      return await newProduct.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   *
   * @param param0 -  productId, auth
   * @returns
   */
  async delete({ id, auth }: { id: string; auth: string }): Promise<any> {
    const deleteProduct = await this.productModel.deleteOne({
      _id: convertToObjectIdMongodb(id),
      product_auth: convertToObjectIdMongodb(auth),
    });

    return deleteProduct;
  }

  /**
   *
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findOne({
        _id: convertToObjectIdMongodb(id),
      })
      .populate([
        {
          path: 'product_brand',
          select: '-__v -createdAt -updatedAt',
        },
        {
          path: 'product_category',
          select: '-__v -createdAt -updatedAt',
        },
      ])
      .lean<Product>();

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  /**
   *
   * @param filters
   * @returns
   */
  async findAll(filters: FilterQuery<IQueryAdvanced>): Promise<any> {
    const { limit, page, query, filter, select } = filters;
    return await this.queryProduct({
      limit,
      page,
      query,
      filter,
      select,
    });
  }

  /**
   *
   * @param filter
   */
  findByPublishOrDraft(filters: FilterQuery<IQueryAdvanced>): Promise<any> {
    const { limit, page, query, filter } = filters;
    return this.queryProduct({
      limit,
      page,
      query,
      filter,
    });
  }

  /**
   *
   * @param param0
   * @returns
   */
  async actionPublish({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: string;
  }): Promise<any> {
    // Thay auth bằng role
    const res = await this.productModel.updateOne(
      {
        _id: convertToObjectIdMongodb(product_id),
      },
      {
        $set: {
          isDraft: false,
          isPublished: true,
        },
      },
    );

    return res;
  }

  /**
   *
   * @param param0
   * @returns
   */
  async actionDraft({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: string;
  }): Promise<any> {
    // Thay auth bằng role
    return await this.productModel.updateOne(
      {
        _id: convertToObjectIdMongodb(product_id),
      },
      {
        $set: {
          isDraft: true,
          isPublished: false,
        },
      },
    );
  }

  /**
   *
   * @param filter
   * @returns
   */
  async search(filter?: FilterQuery<Product>): Promise<Product[]> {
    const isTextSearch = filter?.$text !== undefined;

    const projection = isTextSearch
      ? { score: { $meta: 'textScore' } }
      : undefined;

    const sort = isTextSearch ? { score: { $meta: 'textScore' } } : undefined;

    return this.productModel.find(filter, projection).sort(sort).lean().exec();
  }

  async update({
    id,
    data,
    auth,
  }: {
    id: string;
    data: UpdateProductDto;
    auth: IAuth;
  }): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(
      convertToObjectIdMongodb(id),
      data,
      {
        new: true,
      },
    );
  }

  async queryProduct({
    limit = 10,
    sort,
    page = 1,
    select,
    filter,
    query,
  }: IQueryAdvanced) {
    const skip = (page - 1) * limit;

    const { brand, category } = query;

    if (category) {
      try {
        filter.product_category = convertToObjectIdMongodb(category);
      } catch (error) {
        throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
      }
    }

    if (brand) {
      try {
        filter.product_brand = convertToObjectIdMongodb(brand);
      } catch (error) {
        throw new HttpException('Invalid brand ID', HttpStatus.BAD_REQUEST);
      }
    }
    const finalFilter = { ...filter };

    const data = await this.productModel
      .find(finalFilter)
      .limit(limit)
      .sort(sort)
      .skip(skip)
      .populate([
        {
          path: 'product_brand',
          select: '-__v -createdAt -updatedAt',
        },
        {
          path: 'product_category',
          select: '-__v -createdAt -updatedAt',
        },
      ])
      .select(select)
      .lean();

    const total = await this.productModel.countDocuments(finalFilter);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getArrayProduct(productId: any) {
    return await this.productModel
      .find({ _id: { $in: productId.map(convertToObjectIdMongodb) } })
      .lean();
  }

  async checkProduct(products: any, cart: any) {
    const productIds = products.map((product) => product.productId);

    const foundProducts = await this.getArrayProduct(productIds);

    const productMap = new Map(
      foundProducts.map((product) => [product._id.toString(), product]),
    );

    return products
      .map((product) => {
        const foundCartItems = cart.cart_products.filter(
          (item) => item.productId.toString() === product.productId.toString(),
        );

        if (foundCartItems.length > 0) {
          const foundProduct = productMap.get(product.productId.toString());

          if (foundProduct) {
            const totalQuantity = foundCartItems.reduce(
              (sum, item) => sum + item.quantity,
              0,
            );
            const totalPrice = foundCartItems.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0,
            );

            return {
              price: totalPrice / totalQuantity,
              quantity: totalQuantity,
              productId: foundCartItems[0].productId,
              product_price: foundProduct.product_price,
              thumb: foundProduct.product_thumb,
              name: foundProduct.product_name,
              product_quantity: foundProduct.product_quantity,
            };
          }
        }
      })
      .filter((item) => item !== undefined);
  }
}
