import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [OcrService, PrismaService],
  exports: [OcrService],
})
export class OcrModule {}
