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
import { Auth, Public, ResponseMessage } from 'src/common/customize';
import { IQuery } from 'src/interfaces';
import { IAuth } from '../auth/auth.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ResponseMessage('Create product successfully')
  @Post('create')
  create(@Body() createProductDto: CreateProductDto, @Auth() auth: IAuth) {
    return this.productsService.create(createProductDto, auth);
  }

  @ResponseMessage('Published product successfully')
  @Post('publish/:id')
  publishProduct(@Auth() auth: IAuth, @Param() productId: string) {
    return this.productsService.publishProduct({
      product_id: productId,
      product_auth: auth,
    });
  }

  @ResponseMessage('Published product successfully')
  @Post('unPublish/:id')
  unPublishProduct(@Auth() auth: IAuth, @Param() productId: string) {
    return this.productsService.unPublishProduct({
      product_id: productId,
      product_auth: auth,
    });
  }

  @Public()
  @ResponseMessage('Get all products successfully')
  @Get()
  findAll(
    @Query()
    queryParams: IQuery,
  ) {
    const { category, brand, limit, page } = queryParams;

    const query: Partial<IQuery> = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;

    return this.productsService.findAllProduct({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      query,
      filter: { isPublished: true },
    });
  }

  @ResponseMessage('Get all publish products successfully')
  @Get('publish')
  findAllProductPublish(@Auth() auth: IAuth) {
    return this.productsService.findAllProductPublish({
      product_auth: auth,
    });
  }

  @ResponseMessage('Get all draft products successfully')
  @Get('draft')
  findAllProductDraft(@Auth() auth: IAuth) {
    return this.productsService.findAllProductDraft({
      product_auth: auth,
    });
  }

  @Public()
  @ResponseMessage('Search products successfully')
  @Get('search/:key')
  searchProduct(@Param('key') param) {
    return this.productsService.searchProduct({
      key: param,
    });
  }

  @Public()
  @ResponseMessage('Find one product successfully')
  @Get(':id')
  @ResponseMessage('Find one product')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('update/:id')
  @ResponseMessage('Update product successfully')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Auth() auth: IAuth,
  ) {
    return this.productsService.updateProduct(id, updateProductDto, auth);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Auth() auth: IAuth) {
    return this.productsService.removeProduct(id, auth);
  }
}
