import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class AppService {
  // constructor(@InjectQueue('e-visa') private eVisaQueue: Queue) {}

  // async addToQueue(data: any) {
  //   await this.eVisaQueue.add('e-visa', data);
  // }
  
  getHello(): string {
    return 'Hello World!';
  }
}
