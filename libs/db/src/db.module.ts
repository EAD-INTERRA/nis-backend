import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
