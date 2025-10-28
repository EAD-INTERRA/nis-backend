import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CoreDbService } from '@app/db';
import { CrmDbService } from '@app/db/crm/crm.service';

@Module({
  providers: [UsersService, CoreDbService, CrmDbService],
  exports: [UsersService],
})
export class UsersModule {}
