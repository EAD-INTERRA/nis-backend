import { Module } from '@nestjs/common';
import { EVisaService } from './e-visa.service';
import { DbService } from '@app/db';

@Module({
  providers: [EVisaService, DbService],
  exports: [EVisaService],
})
export class EVisaModule {}
