import { Module } from '@nestjs/common';
import { ScorecardController } from './scorecard.controller';
import { ScorecardService } from './scorecard.service';

@Module({
  controllers: [ScorecardController],
  providers: [ScorecardService],
  exports: [ScorecardService],
})
export class ScorecardModule {}
