import { Module } from '@nestjs/common';
import { ReplicaService } from './replica.service';
import { CaseService } from './case/case.service';
import { ReplicaDbService } from '@app/db/replica.service';
import { DbModule } from '@app/db';
import { AccountService } from './account/account.service';
import { VisaDocumentService } from './visa-document/visa-document.service';

@Module({
  imports: [DbModule],
  providers: [ReplicaService, ReplicaDbService, CaseService, AccountService, VisaDocumentService],
  exports: [ReplicaService, CaseService, AccountService, VisaDocumentService],
})
export class ReplicaModule {}
