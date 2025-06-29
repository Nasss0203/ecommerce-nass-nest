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
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Seller)
  @ResponseMessage('Create category successfully')
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto, @Auth() auth: IAuth) {
    return this.categoryService.create({
      createCategoryDto,
      shopId: auth.shop_id,
    });
  }

  @Public()
  @ResponseMessage('Get all category successfully')
  @Get()
  findAll(
    @Query()
    query: any,
  ) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
