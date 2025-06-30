import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  Public,
  ResponseMessage,
} from 'src/common/decorator/customize.decorator';
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

  @Get(':id')
  @ResponseMessage('Get all SKU successfully')
  @Public()
  findAll(@Param('id') product_id: string) {
    return this.skuService.findAll({ product_id });
  }

  @Public()
  @ResponseMessage('Select variation successfully')
  @Get('select_variation')
  findOneSku(@Query() query: { sku_id?: string; product_id?: string }) {
    const sku_id = String(query.sku_id);
    const product_id = String(query.product_id);
    return this.skuService.findOneSku({ product_id, sku_id });
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
