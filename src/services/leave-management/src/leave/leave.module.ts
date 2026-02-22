import { Module } from '@nestjs/common';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeavePolicyValidationService } from '../policy/leave-policy-validation.service';

@Module({
  controllers: [LeaveController],
  providers: [LeaveService, LeavePolicyValidationService],
  exports: [LeaveService, LeavePolicyValidationService],
})
export class LeaveModule {}
