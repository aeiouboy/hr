import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WorkflowModule } from './workflow/workflow.module';
import { RulesModule } from './rules/rules.module';
import { QuickApproveModule } from './quick-approve/quick-approve.module';
import { PolicyValidationModule } from './policy-validation/policy-validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RulesModule,
    WorkflowModule,
    QuickApproveModule,
    PolicyValidationModule,
  ],
})
export class AppModule {}
