import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import UserController from './controllers/user.controller';
import UserService from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [UserService],
})
export class AppModule {}
