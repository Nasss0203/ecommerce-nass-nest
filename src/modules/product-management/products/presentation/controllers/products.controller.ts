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
import { IQuery } from 'src/interfaces';
import { IAuth } from 'src/modules/user-management/auth/auth.interface';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { ActionDraftProductUsecase } from '../../application/use-case/action-draft.use-case';
import { ActionPublishProductUsecase } from '../../application/use-case/action-publish.use-case';
import { CreateProductUseCase } from '../../application/use-case/create.use-case';
import { DeleteProductUsecase } from '../../application/use-case/delete.use-case';
import { FindAllProductDraftUsecase } from '../../application/use-case/findAll-draft.use-case';
import { FindAllProductPublishUsecase } from '../../application/use-case/findAll-publish.use-case';
import { FindAllProductUsecase } from '../../application/use-case/findAll.use-case';
import { FindOneProductUsecase } from '../../application/use-case/findOne.use-case';
import { SearchProductUsecase } from '../../application/use-case/search.use-case';
import { UpdateProductUsecase } from '../../application/use-case/update.use-case';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUsecase: DeleteProductUsecase,
    private readonly findAllProductUsecase: FindAllProductUsecase,
    private readonly findOneProductUsecase: FindOneProductUsecase,
    private readonly actionPublishProductUsecase: ActionPublishProductUsecase,
    private readonly actionDraftProductUsecase: ActionDraftProductUsecase,
    private readonly findAllProductPublishUsecase: FindAllProductPublishUsecase,
    private readonly findAllProductDraftUsecase: FindAllProductDraftUsecase,
    private readonly searchProductUsecase: SearchProductUsecase,
    private readonly updateProductUsecase: UpdateProductUsecase,
  ) {}

  /**
   *
   * @param createProductDto
   * @param auth
   * @returns
   */
  @Roles(Role.Seller)
  @ResponseMessage('Create product successfully')
  @Post('create')
  create(@Body() createProductDto: CreateProductDto, @Auth() auth: IAuth) {
    // return this.createProductUseCase.execute(createProductDto, auth._id);
    return this.createProductUseCase.execute({
      createProductDto,
      userId: auth._id,
      shopId: auth.shop_id,
    });
  }

  /**
   *
   * @param auth
   * @param productId
   * @returns
   */
  @ResponseMessage('Published product successfully')
  @Post('publish/:id')
  publishProduct(@Auth() auth: IAuth, @Param() productId: string) {
    return this.actionPublishProductUsecase.execute({
      product_id: productId,
      product_auth: auth._id,
    });
  }

  /**
   *
   * @param auth
   * @param productId
   * @returns
   */
  @ResponseMessage('Draft product successfully')
  @Post('unpublish/:id')
  unPublishProduct(@Auth() auth: IAuth, @Param('id') productId: string) {
    return this.actionDraftProductUsecase.execute({
      product_id: productId,
      product_auth: auth._id,
    });
  }

  /**
   *
   * @param queryParams
   * @returns
   */
  @Public()
  @ResponseMessage('Get all products successfully')
  @Get()
  findAll(
    @Query()
    queryParams: IQuery,
  ) {
    return this.findAllProductUsecase.execute(queryParams);
  }

  /**
   *
   * @param auth
   * @returns
   */
  @ResponseMessage('Get all publish products successfully')
  @Get('publish')
  findAllProductPublish(@Auth() auth: IAuth) {
    return this.findAllProductPublishUsecase.execute({
      product_auth: auth,
    });
  }

  /**
   *
   * @param auth
   * @returns
   */
  @ResponseMessage('Get all draft products successfully')
  @Get('draft')
  findAllProductDraft(@Auth() auth: IAuth) {
    return this.findAllProductDraftUsecase.execute({
      product_auth: auth,
    });
  }

  /**
   *
   * @param param
   * @returns
   */
  @Public()
  @ResponseMessage('Search products successfully')
  @Get('search/:key')
  searchProduct(@Param('key') param) {
    return this.searchProductUsecase.execute({
      key: param,
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  @Public()
  @ResponseMessage('Find one product successfully')
  @Get(':id')
  @ResponseMessage('Find one product')
  findOne(@Param('id') id: string) {
    return this.findOneProductUsecase.execute(id);
  }

  /**
   *
   * @param id
   * @param updateProductDto
   * @param auth
   * @returns
   */
  @Patch('update/:id')
  @ResponseMessage('Update product successfully')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Auth() auth: IAuth,
  ) {
    return this.updateProductUsecase.execute(id, updateProductDto, auth);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Auth() auth: IAuth) {
    return this.deleteProductUsecase.execute(id, auth._id);
  }
}
