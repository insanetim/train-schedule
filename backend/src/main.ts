import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: configService.get<string>('app.clientUrl'),
  });

  await app.listen(configService.get<string>('app.port'));
}
bootstrap();
