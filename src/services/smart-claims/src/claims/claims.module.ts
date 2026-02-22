import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { OcrModule } from '../ocr/ocr.module';
import { PolicyModule } from '../policy/policy.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [OcrModule, PolicyModule],
  controllers: [ClaimsController],
  providers: [ClaimsService, PrismaService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
