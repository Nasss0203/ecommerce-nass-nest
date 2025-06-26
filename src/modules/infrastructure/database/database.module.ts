import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        autoIndex: false,
        maxPoolSize: 5,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
