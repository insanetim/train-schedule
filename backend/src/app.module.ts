import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { SchedulesModule } from '@modules/schedules/schedules.module';
import { UsersModule } from '@modules/users/users.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { appConfig, dbConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [
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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
