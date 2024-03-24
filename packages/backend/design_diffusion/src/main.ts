import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Design } from './design/entities/design.entity';

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The Prism - API')
    .setDescription('APIs for The Prism application.')
    .setVersion('1.0')
    .addTag('the_prism')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Design],
  });
  SwaggerModule.setup('swagger', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });
  app.use(cors());
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
