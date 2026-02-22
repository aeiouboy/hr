import { Module } from '@nestjs/common';
import { IdpController } from './idp.controller';
import { IdpService } from './idp.service';

@Module({
  controllers: [IdpController],
  providers: [IdpService],
  exports: [IdpService],
})
export class IdpModule {}
