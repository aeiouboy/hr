import { Module } from '@nestjs/common';
import { SmartClaimsService } from './claims.service';
import { SmartClaimsController } from './claims.controller';
import { PolicyRulesService } from './policy-rules.service';
import { OCRService } from './ocr.service';
import { ClaimsPolicyValidationService } from '../policy/claims-policy-validation.service';

@Module({
  controllers: [SmartClaimsController],
  providers: [SmartClaimsService, PolicyRulesService, OCRService, ClaimsPolicyValidationService],
  exports: [SmartClaimsService, PolicyRulesService, OCRService, ClaimsPolicyValidationService],
})
export class ClaimsModule {}
