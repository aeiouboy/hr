import { Module } from '@nestjs/common';
import { PolicyValidationService } from './policy-validation.service';
import { PolicyValidationController } from './policy-validation.controller';

@Module({
  controllers: [PolicyValidationController],
  providers: [PolicyValidationService],
  exports: [PolicyValidationService],
})
export class PolicyValidationModule {}
