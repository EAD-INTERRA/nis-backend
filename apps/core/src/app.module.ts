import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditController } from './audit/audit.controller';
import { DbModule, CoreDbService } from '@app/db';
import { AuthModule } from 'apps/auth/src/auth.module';
import { AuditModule } from '@app/audit';
import { ServeStaticModule } from '@nestjs/serve-static';
import { extname, join } from 'path';
import { EVisaController } from './e-visa/e-visa.controller';
import { EVisaModule } from '@app/e-visa';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BullModule } from '@nestjs/bullmq';
import { EVisaConsumer } from '@app/e-visa/e-visa.consumer';
import { CaseController } from './case/case.controller';
import { ReplicaModule } from '@app/replica';
import { ReplicaDbService } from '@app/db/replica.service';
import { AccountController } from './account/account.controller';
import { VisaDocumentController } from './visa-document/visa-document.controller';

console.log("PATH: ", join(__dirname, '..', '..', '..', 'public'))

@Module({
  imports: [
    DbModule, 
    AuthModule, 
    AuditModule, 
    EVisaModule,
    ReplicaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
      serveRoot: '/public'
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    })
  ],
  controllers: [AppController, AuditController, EVisaController, CaseController, AccountController, VisaDocumentController],
  providers: [AppService, CoreDbService, EVisaConsumer, ReplicaDbService],
})
export class AppModule {}
