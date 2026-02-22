import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PolicyService, PrismaService],
  exports: [PolicyService],
})
export class PolicyModule {}
