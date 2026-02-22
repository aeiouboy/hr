import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PayslipGenerator } from './generators/payslip.generator';
import { TaxCertGenerator } from './generators/tax-cert.generator';
import { CertificateGenerator } from './generators/certificate.generator';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, PayslipGenerator, TaxCertGenerator, CertificateGenerator],
  exports: [DocumentService],
})
export class DocumentModule {}
