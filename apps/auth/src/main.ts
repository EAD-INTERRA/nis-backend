import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as compression from 'compression';
import { auditLogger } from '@app/db/middleware/audit.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.use(auditLogger)
  
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  });
  app.enableCors({
    origin: false, // disable Nest’s ACAO header
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false
  });

  const config = new DocumentBuilder()
    .setTitle('Template Auth Service')
    .setDescription('This contains the swagger docs for the Auth Module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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

  // app.use(auditLogger)

  await app.listen(process.env.AUTH_PORT ?? 3000);
}
bootstrap();
