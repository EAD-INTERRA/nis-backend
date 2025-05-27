import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CoreDbService } from '@app/db';

@Module({
  providers: [UsersService, CoreDbService],
  exports: [UsersService],
})
export class UsersModule {}
