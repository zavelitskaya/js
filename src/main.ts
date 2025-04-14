import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://127.0.0.1:3000', // Разрешить запросы только с вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    preflightContinue: false, // Важно: Установите в false
    optionsSuccessStatus: 204,  // Важно: Установите в 204 или 200
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();