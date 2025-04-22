import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CoreDbService } from '@app/db';

@Module({
  providers: [AuditService, CoreDbService],
  exports: [AuditService],
})
export class AuditModule {}
