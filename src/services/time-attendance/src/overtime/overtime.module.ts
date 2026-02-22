import { Module } from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { OvertimeController } from './overtime.controller';
import { OTPolicyValidationService } from '../policy/ot-policy-validation.service';

@Module({
  controllers: [OvertimeController],
  providers: [OvertimeService, OTPolicyValidationService],
  exports: [OvertimeService, OTPolicyValidationService],
})
export class OvertimeModule {}
