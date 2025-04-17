import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Auth, Public, ResponseMessage } from 'src/common/customize';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { IAuth } from './auth.interface';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage('Register successfully')
  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Login successfully')
  @Post('login')
  async login(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @ResponseMessage('Get account')
  @Get('account')
  handleGetAccount(@Auth() auth: IAuth) {
    return auth;
  }

  @Public()
  @ResponseMessage('Refresh token')
  @Post('refreshToken')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshToken(request, response);
  }

  @ResponseMessage('Logout account successfully')
  @Post('logout')
  handleLogout(
    @Auth() auth: IAuth,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(auth, response);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Find one auth')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
