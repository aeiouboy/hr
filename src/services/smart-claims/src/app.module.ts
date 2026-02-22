import { Module } from '@nestjs/common';
import { ClaimsModule } from './claims/claims.module';
import { OcrModule } from './ocr/ocr.module';
import { PolicyModule } from './policy/policy.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ClaimsModule, OcrModule, PolicyModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
