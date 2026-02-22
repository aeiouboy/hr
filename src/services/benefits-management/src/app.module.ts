import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlanModule } from './plan/plan.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ClaimModule } from './claim/claim.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    PrismaModule,
    PlanModule,
    EnrollmentModule,
    ClaimModule,
    ClaimsModule,
  ],
})
export class AppModule {}
