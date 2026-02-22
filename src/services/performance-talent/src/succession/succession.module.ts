import { Module } from '@nestjs/common';
import { SuccessionController } from './succession.controller';
import { SuccessionService } from './succession.service';

@Module({
  controllers: [SuccessionController],
  providers: [SuccessionService],
  exports: [SuccessionService],
})
export class SuccessionModule {}
