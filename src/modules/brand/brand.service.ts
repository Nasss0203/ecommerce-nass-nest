import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  async create(createBrandDto: CreateBrandDto) {
    const data = await this.brandModel.create({ ...createBrandDto });
    return data;
  }

  findAll() {
    return `This action returns all brand`;
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
