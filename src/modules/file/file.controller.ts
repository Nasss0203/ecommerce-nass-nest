import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/common/customize';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ResponseMessage('Upload file successfully')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(image\/(jpeg|png|gif)|text\/plain|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document))$/i,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.uploadFileImageCloudinary({
      path: file.path,
    });
  }

  @Post('upload-multi')
  @ResponseMessage('Upload multi file successfully')
  @UseInterceptors(FilesInterceptor('files', 20))
  async uploadFileMulti(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(image\/(jpeg|png|gif)|text\/plain|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document))$/i,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ) {
    return await this.fileService.uploadMultiFileImageCloudinary({
      images: files.map((file) => file.path),
    });
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
