import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from './common/prisma.client';
import UserController from './controllers/user.controller';
import ResponseHandler from './dto/response.handler';
import { jwtConstants } from './jwt.constants';
import UserService from './services/user.service';
import { AccessStategy } from './stratagies/access.stratagies';
import { RefreshStategy } from './stratagies/refresh.stratagies';
import HashUtils from './utils/hash.utils';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [UserController],
  providers: [
    PrismaService, 
    UserService, 
    HashUtils, 
    ResponseHandler, 
    JwtService, 
    RefreshStategy, 
    AccessStategy
  ],
})
export class AppModule {}
