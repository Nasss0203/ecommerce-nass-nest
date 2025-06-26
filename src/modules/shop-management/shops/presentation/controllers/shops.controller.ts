import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  Auth,
  ResponseMessage,
} from 'src/common/decorator/customize.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { CreateShopDto } from '../../application/dto/create-shop.dto';
import { UpdateShopDto } from '../../application/dto/update-shop.dto';
import { CreateShopUseCase } from '../../application/use-case/create.use-case';

@Controller('shops')
export class ShopsController {
  constructor(private readonly createShopUseCase: CreateShopUseCase) {}

  /**
   *
   * @param CreateShopDto
   * @param auth
   * @returns
   */
  @Roles(Role.User)
  @ResponseMessage('Create shop successfully')
  @Post('create')
  create(@Body() createShopDto: CreateShopDto, @Auth() auth: IAuth) {
    return this.createShopUseCase.execute(createShopDto, auth._id);
  }

  @Get()
  findAll() {
    // return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.shopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    // return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.shopsService.remove(+id);
  }
}
