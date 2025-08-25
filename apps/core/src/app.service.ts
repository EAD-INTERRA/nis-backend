import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { exception, ServiceResponse, success } from '@app/utils/response';
import { CoreDbService } from '@app/db';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly dbService: CoreDbService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getPermissions(): Promise<ServiceResponse> {
    try {
      return success(
        await this.dbService.permission.findMany({
          orderBy: {
            resource: 'asc',
          },
        }),
      );
    } catch (err) {
      console.error(err);
      exception({ message: err, customMessage: 'Failed to load permissions' });
    }
  }
}
