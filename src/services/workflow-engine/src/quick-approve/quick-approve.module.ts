import { Module } from '@nestjs/common';
import { QuickApproveController } from './quick-approve.controller';
import { QuickApproveService } from './quick-approve.service';

@Module({
  controllers: [QuickApproveController],
  providers: [QuickApproveService],
  exports: [QuickApproveService],
})
export class QuickApproveModule {}
