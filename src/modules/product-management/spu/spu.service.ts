import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { randomProductId } from 'src/utils';
import { SkuService } from '../sku/sku.service';
import { CreateSpuDto } from './dto/create-spu.dto';
import { UpdateSpuDto } from './dto/update-spu.dto';
import { Spu } from './schemas/spu.schema';

@Injectable()
export class SpuService {
  constructor(
    @InjectModel(Spu.name) private spuModel: Model<Spu>,
    private skuService: SkuService,
  ) {}
  async create(createSpuDto: CreateSpuDto, userId: IAuth) {
    const newSpu = await this.spuModel.create({
      product_id: randomProductId(),
      product_auth: userId,
      ...createSpuDto,
    });

    if (newSpu && createSpuDto.sku_list.length) {
      await this.skuService.create({
        spu_id: newSpu.product_id,
        sku_list: createSpuDto.sku_list,
      });
    }

    return !!newSpu;
  }

  findAll() {
    return `This action returns all spu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spu`;
  }

  update(id: number, updateSpuDto: UpdateSpuDto) {
    return `This action updates a #${id} spu`;
  }

  remove(id: number) {
    return `This action removes a #${id} spu`;
  }
}
