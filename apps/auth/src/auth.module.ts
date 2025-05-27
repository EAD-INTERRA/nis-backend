import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '@app/db';
import { UsersController } from './users/users.controller';
import { UsersService } from '@app/users';

dotenv.config()

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
