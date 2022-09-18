import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Atex')
    .setDescription('Atex API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Atex API',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
