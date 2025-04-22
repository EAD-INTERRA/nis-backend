import { Module } from '@nestjs/common';
import { EVisaService } from './e-visa.service';
import { CoreDbService } from '@app/db';
import { BullModule } from '@nestjs/bullmq';
import { EVisaConsumer } from './e-visa.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'e-visa',
    }),
  ],
  providers: [EVisaService, CoreDbService, EVisaConsumer],
  exports: [EVisaService, EVisaConsumer],
})
export class EVisaModule {}
