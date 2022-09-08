import { Module } from '@nestjs/common';
import { PrismaService } from './common/prisma.client';
import UserController from './controllers/user.controller';
import ResponseHandler from './dto/response.handler';
import UserService from './services/user.service';
import HashUtils from './utils/hash.utils';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, HashUtils, ResponseHandler],
})
export class AppModule {}
