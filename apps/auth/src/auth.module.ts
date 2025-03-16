import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '@app/db';

dotenv.config()

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
