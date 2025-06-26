import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  async create(createBrandDto: CreateBrandDto) {
    const { brand_name, categories } = createBrandDto;
    const existingBrand = await this.brandModel.findOne({
      brand_name: brand_name.toLowerCase(),
      categories,
    });

    if (existingBrand) {
      throw new HttpException(
        'Brand with this category already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.brandModel.create({ ...createBrandDto });
    return data;
  }

  async findAll({ categoryId }: { categoryId: string }) {
    const data = await this.brandModel
      .find({ categories: categoryId })
      .select(['-__v', '-createdAt', '-updatedAt'])
      .populate({
        path: 'products',
        match: { isPublished: true },
      })
      .lean();

    return data;
  }

  findOne(id: string) {
    return this.brandModel.findOne({ _id: id });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
