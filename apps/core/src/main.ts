import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import * as compression from 'compression';
import { auditLogger } from '@app/db/middleware/audit.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(auditLogger)
  app.useBodyParser('json', { limit: '50mb' });
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Versioning and CORS
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  });
  app.enableCors();

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('E-Visa Base Services')
    .setDescription('This contains the swagger docs for the Core/Base Module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    whitelist: true,
    forbidNonWhitelisted: false,
  }));

  // Enable gzip compression
  app.use(compression());

  await app.listen(process.env.BASE_PORT ?? 3001);
}
bootstrap();
