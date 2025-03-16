import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import * as compression from 'compression';
import { auditLogger } from '@app/db/middleware/audit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(auditLogger)

  // Versioning and CORS
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  });
  app.enableCors();

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('DAT Base Services')
    .setDescription('This contains the swagger docs for the Core/Base Module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // Enable gzip compression
  app.use(compression());

  await app.listen(process.env.BASE_PORT ?? 3001);
}
bootstrap();
