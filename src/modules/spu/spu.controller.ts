import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/common/customize';
import { IAuth } from '../auth/auth.interface';
import { CreateSpuDto } from './dto/create-spu.dto';
import { UpdateSpuDto } from './dto/update-spu.dto';
import { SpuService } from './spu.service';

@Controller('spu')
export class SpuController {
  constructor(private readonly spuService: SpuService) {}

  @Post('create')
  create(@Body() createSpuDto: CreateSpuDto, @Auth() auth: IAuth) {
    return this.spuService.create(createSpuDto, auth);
  }

  @Get()
  findAll() {
    return this.spuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spuService.findOne(+id);
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
