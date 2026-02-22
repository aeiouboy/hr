import { Module } from '@nestjs/common';
import { PolicyConfigService } from './policy-config.service';
import { PolicyConfigController } from './policy-config.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PolicyConfigController],
  providers: [PolicyConfigService],
  exports: [PolicyConfigService],
})
export class PolicyConfigModule {}
