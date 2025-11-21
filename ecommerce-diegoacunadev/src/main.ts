import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDoc = new DocumentBuilder()
    .setTitle('PI Backend - API de Comercio Electrónico')
    .setDescription(
      'Esta API proporciona los endpoints necesarios para gestionar un sistema de comercio electrónico, incluyendo usuarios, productos, categorías, pedidos y autenticación. Está desarrollada con el framework NestJS siguiendo las mejores prácticas de arquitectura modular y principios RESTful.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentModule = SwaggerModule.createDocument(app, swaggerDoc);

  SwaggerModule.setup('api', app, documentModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
