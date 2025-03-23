import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {}

  async uploadFileImageCloudinary({ path, folderName = 'product' }) {
    const result = await this.cloudinary.uploader.upload(path, {
      folder: folderName,
    });

    return {
      image_url: result.secure_url,
      thumb_url: await this.cloudinary.url(result.public_id, {
        height: 600,
        width: 700,
        format: 'jpg',
      }),
    };
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
