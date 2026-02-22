import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PositionModule } from './position/position.module';
import { OrgChartModule } from './org-chart/org-chart.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PositionModule,
    OrgChartModule,
    TransferModule,
  ],
})
export class AppModule {}
