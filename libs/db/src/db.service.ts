
import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient as CorePrismaClient } from '@prisma/core/client';

@Injectable()
export class CoreDbService extends CorePrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
