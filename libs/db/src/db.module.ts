import { Module } from '@nestjs/common';
import { CoreDbService } from './db.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReplicaDbService } from './replica.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [CoreDbService, ReplicaDbService],
  exports: [CoreDbService],
})
export class DbModule {}
