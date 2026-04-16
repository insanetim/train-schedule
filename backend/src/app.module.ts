import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { appConfig, dbConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Global configuration module with environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    // Database service module
    PrismaModule,
  ],
  controllers: [],
  providers: [
    // Global validation pipe for all endpoints
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    // Global JWT authentication guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
