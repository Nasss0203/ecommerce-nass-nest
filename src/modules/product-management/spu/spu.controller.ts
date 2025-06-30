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
  Auth,
  Public,
  ResponseMessage,
} from 'src/common/decorator/customize.decorator';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { CreateSpuDto } from './dto/create-spu.dto';
import { UpdateSpuDto } from './dto/update-spu.dto';
import { SpuService } from './spu.service';

@Controller('spu')
export class SpuController {
  constructor(private readonly spuService: SpuService) {}

  @Post('create')
  @ResponseMessage('Create SPU successfully')
  create(@Body() createSpuDto: CreateSpuDto, @Auth() auth: IAuth) {
    return this.spuService.create(createSpuDto, auth);
  }

  @Get()
  findAll() {
    return this.spuService.findAll();
  }

  @Get('get_spu_info')
  @ResponseMessage('Get SPU successfully')
  @Public()
  findOne(@Query() query: { product_id?: string }) {
    const product_id = String(query.product_id);
    return this.spuService.findOne({ spu_id: product_id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpuDto: UpdateSpuDto) {
    return this.spuService.update(+id, updateSpuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spuService.remove(+id);
  }
}
