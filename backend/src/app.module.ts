import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
