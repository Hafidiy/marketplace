import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ChangeResponseInterceptor } from './modules/common/change-response.interceptor';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';
import * as exphbs from 'express-handlebars';
import { join } from 'path';
import { hbsConfig } from './config/engine.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new ChangeResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // app.setViewEngine('hbs')
  // app.engine('hbs', hbsConfig.engine);
  // app.set('view engine', 'hbs');

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
}
bootstrap();
