import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryProvider } from 'src/configs/cloudinary.config';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterConfigService } from './multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [FileController],
  providers: [FileService, CloudinaryProvider, MulterConfigService],
  exports: [CloudinaryProvider],
})
export class FileModule {}
