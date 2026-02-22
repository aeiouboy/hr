import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PayrollModule } from './payroll/payroll.module';
import { CompensationModule } from './compensation/compensation.module';
import { TaxModule } from './tax/tax.module';
import { GovernmentModule } from './government/government.module';

@Module({
  imports: [
    PrismaModule,
    PayrollModule,
    CompensationModule,
    TaxModule,
    GovernmentModule,
  ],
})
export class AppModule {}
