import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuery } from 'src/interfaces';
import { convertToObjectIdMongodb } from 'src/utils';
import { IAuth } from '../auth/auth.interface';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private brandService: BrandService,
  ) {}

  async createProduct(createProductDto: CreateProductDto, userId: IAuth) {
    const category = await this.categoryService.findOne(
      createProductDto.product_category,
    );
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const brand = await this.brandService.findOne(
      createProductDto.product_brand,
    );
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.productModel.create({
      ...createProductDto,
      product_auth: userId,
    });

    if (product) {
      await this.inventoryService.create({
        inventory_productId: convertToObjectIdMongodb(product._id),
        inventory_authId: convertToObjectIdMongodb(product.product_auth),
        inventory_stock: product.product_quantity,
        inventory_location: 'unknow',
        inventory_reservations: [],
      });
    }
    return product;
  }

  async pulishProduct({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: IAuth;
  }) {
    const productId = await this.productModel.findOne({
      _id: convertToObjectIdMongodb(product_id),
      product_auth,
    });

    if (!productId)
      throw new HttpException(
        'Product not found | pulishProduct',
        HttpStatus.NOT_FOUND,
      );
    productId.isDraft = false;
    productId.isPublished = true;

    return await productId.updateOne(productId);
  }

  async unPulishProduct({
    product_id,
    product_auth,
  }: {
    product_id: string;
    product_auth: IAuth;
  }) {
    const productId = await this.productModel.findOne({
      _id: convertToObjectIdMongodb(product_id),
      product_auth,
    });

    if (!productId)
      throw new HttpException(
        'Product not found | unPulishProduct',
        HttpStatus.NOT_FOUND,
      );
    productId.isDraft = true;
    productId.isPublished = false;

    return await productId.updateOne(productId);
  }

  async findAllProduct({
    limit,
    page,
    query,
    filter,
    select,
  }: {
    limit?: number;
    page?: number;
    filter?: { isPublished: boolean };
    query?: IQuery;
    select?: string[];
  }) {
    return await this.queryProduct({
      limit,
      page,
      filter,
      query,
      select,
    });
  }

  async findAllProductPublish({
    limit = 10,
    page = 1,
    query,
  }: {
    limit?: number;
    page?: number;
    query?: IQuery;
  }) {
    return await this.queryProduct({
      limit,
      page,
      query,
    });
  }

  async findAllProductDraft({
    limit = 10,
    page = 1,
    query,
  }: {
    limit?: number;
    page?: number;
    query?: IQuery;
  }) {
    return await this.queryProduct({
      limit,
      page,
      query,
    });
  }

  async findOneProduct(id: string) {
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
      .lean();
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async searchProduct({ key }: { key: string }) {
    if (!key || typeof key !== 'string') {
      throw new HttpException('Invalid search key', HttpStatus.BAD_REQUEST);
    }
    const results = await this.productModel
      .find(
        {
          isPublished: true,
          $text: { $search: key },
        },
        { score: { $meta: 'textScore' } },
      )
      .sort({ score: { $meta: 'textScore' } })
      .lean();
    console.log(' results~', results);
    return results;
  }

  async updateProduct({
    id,
    updateProductDto,
    isNew = true,
    auth,
  }: {
    id: string;
    updateProductDto: UpdateProductDto;
    isNew?: boolean;
    auth: IAuth;
  }) {
    const pro = await this.productModel.findByIdAndUpdate(
      convertToObjectIdMongodb(id),
      updateProductDto,
      {
        new: isNew,
        updatedAt: convertToObjectIdMongodb(auth._id),
      },
    );
    console.log(' pro~', pro);
    return pro;
  }

  async removeProduct({
    product_id,
    auth,
  }: {
    product_id: string;
    auth: IAuth;
  }) {
    return await this.productModel
      .deleteOne(convertToObjectIdMongodb(product_id))
      .lean();
  }

  async queryProduct({
    limit = 10,
    sort,
    page = 1,
    select,
    filter,
    query,
  }: {
    limit?: number;
    page?: number;
    sort?: any;
    query?: IQuery;
    filter?: any;
    select?: string[];
  }) {
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

    const total = await this.productModel.countDocuments(filter);

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
