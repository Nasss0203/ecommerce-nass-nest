import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { convertToObjectIdMongodb } from 'src/utils';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create({
    createCategoryDto,
    shopId,
  }: {
    createCategoryDto: CreateCategoryDto;
    shopId: string;
  }) {
    const data = await this.categoryModel.create({
      ...createCategoryDto,
      shop_id: convertToObjectIdMongodb(shopId),
    });
    return data;
  }

  async findAll({ limit = 10, page = 1 }: { limit?: number; page?: number }) {
    const skip = (page - 1) * limit;

    const data = await this.categoryModel
      .find()
      .select(['-__v', '-createdAt', '-updatedAt'])
      .populate({
        path: 'products',
        match: { isPublished: true },
      })
      .limit(limit)
      .skip(skip)
      .lean();

    return data;
  }

  async findOne(id: string) {
    return await this.categoryModel.findOne({
      _id: convertToObjectIdMongodb(id),
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
