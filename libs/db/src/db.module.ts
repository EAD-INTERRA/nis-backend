import { Module } from '@nestjs/common';
import { CoreDbService } from './db.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReplicaDbService } from './replica.service';
import { CrmDbService } from './crm/crm.service';
import { WatchlistDbService } from './watchlist/watchlist.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [CoreDbService, ReplicaDbService, CrmDbService, WatchlistDbService],
  exports: [CoreDbService],
})
export class DbModule {}
