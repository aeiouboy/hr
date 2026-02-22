import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ManagerSelfServiceModule } from './manager-self-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ManagerSelfServiceModule,
  ],
})
export class AppModule {}
