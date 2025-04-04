import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { SkuService } from './sku.service';

@Controller('sku')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.skuService.create({ sku_list: [], spu_id: '' });
  }

  @Get()
  findAll() {
    return this.skuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkuDto: UpdateSkuDto) {
    return this.skuService.update(+id, updateSkuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skuService.remove(+id);
  }
}
