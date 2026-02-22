import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
  exports: [TransferService],
})
export class TransferModule {}
