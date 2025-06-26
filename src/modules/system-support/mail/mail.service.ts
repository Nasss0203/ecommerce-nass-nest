import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

interface IMail {
  email: string;
  name: string;
  template: string;
  [key: string]: any;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(mailData: IMail) {
    const { email, name, template, ...context } = mailData;
    const data = await this.mailerService.sendMail({
      to: email,
      from: '"Ecommerce" <support@yourcompany.com>',
      subject: 'Welcome to Ecommerce',
      template,
      context: {
        name,
        ...context,
      },
    });
    return data;
  }
  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
