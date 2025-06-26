import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ResponseMessage } from 'src/common/decorator/customize.decorator';
import { UpdateCheckoutDto } from '../../applications/dto/update-checkout.dto';
import { CheckoutService } from '../../checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('review')
  @ResponseMessage('Checkout successfully')
  create(@Req() req: Request) {
    console.log(' req~', req.body);
    return this.checkoutService.create(req.body);
  }

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get one checkout')
  findOne(@Param('id') id: string) {
    return this.checkoutService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckoutDto: UpdateCheckoutDto,
  ) {
    return this.checkoutService.update(+id, updateCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(+id);
  }
}
