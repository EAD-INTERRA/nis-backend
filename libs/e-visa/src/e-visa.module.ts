import { Module } from '@nestjs/common';
import { EVisaService } from './e-visa.service';
import { CoreDbService } from '@app/db';
import { BullModule } from '@nestjs/bullmq';
import { EVisaConsumer } from './e-visa.consumer';
import { CrmDbService } from '@app/db/crm/crm.service';
import { WatchlistDbService } from '@app/db/watchlist/watchlist.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'e-visa',
    }),
  ],
  providers: [
    EVisaService, 
    CoreDbService, 
    CrmDbService, 
    WatchlistDbService, 
    EVisaConsumer
  ],
  exports: [EVisaService, EVisaConsumer],
})
export class EVisaModule {}
