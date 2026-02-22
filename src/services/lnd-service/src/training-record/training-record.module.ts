import { Module } from '@nestjs/common';
import { TrainingRecordController } from './training-record.controller';
import { TrainingRecordService } from './training-record.service';

@Module({
  controllers: [TrainingRecordController],
  providers: [TrainingRecordService],
  exports: [TrainingRecordService],
})
export class TrainingRecordModule {}
