import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JobPostingModule } from './job-posting/job-posting.module';
import { CandidateModule } from './candidate/candidate.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ResignationModule } from './resignation/resignation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    JobPostingModule,
    CandidateModule,
    OnboardingModule,
    ResignationModule,
  ],
})
export class AppModule {}
