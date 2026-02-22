import { Module } from '@nestjs/common';
import { ManagerSelfServiceController } from './manager-self-service.controller';
import { ManagerSelfServiceService } from './manager-self-service.service';

@Module({
  controllers: [ManagerSelfServiceController],
  providers: [ManagerSelfServiceService],
  exports: [ManagerSelfServiceService],
})
export class ManagerSelfServiceModule {}
