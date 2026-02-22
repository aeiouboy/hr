import { Module } from '@nestjs/common';
import { LndController } from './lnd.controller';
import { LndService } from './lnd.service';

@Module({
  controllers: [LndController],
  providers: [LndService],
  exports: [LndService],
})
export class LndModule {}
