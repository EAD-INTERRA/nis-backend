import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { DbService } from '@app/db';

@Module({
  providers: [AuditService, DbService],
  exports: [AuditService],
})
export class AuditModule {}
