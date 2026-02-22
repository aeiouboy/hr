import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';

@Module({
  controllers: [ClaimController],
  providers: [ClaimService],
  exports: [ClaimService],
})
export class ClaimModule {}
