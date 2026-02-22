import { Module } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { CompensationController } from './compensation.controller';
import { EncryptionService } from '../encryption/encryption.service';

@Module({
  controllers: [CompensationController],
  providers: [CompensationService, EncryptionService],
  exports: [CompensationService],
})
export class CompensationModule {}
