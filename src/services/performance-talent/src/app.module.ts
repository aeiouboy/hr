import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GoalModule } from './goal/goal.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ScorecardModule } from './scorecard/scorecard.module';
import { TalentModule } from './talent/talent.module';
import { SuccessionModule } from './succession/succession.module';
import { IdpModule } from './idp/idp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GoalModule,
    EvaluationModule,
    ScorecardModule,
    TalentModule,
    SuccessionModule,
    IdpModule,
  ],
})
export class AppModule {}
