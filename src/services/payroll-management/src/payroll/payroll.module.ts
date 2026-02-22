import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { EncryptionService } from '../encryption/encryption.service';
import { TaxModule } from '../tax/tax.module';

@Module({
  imports: [TaxModule],
  controllers: [PayrollController],
  providers: [PayrollService, EncryptionService],
  exports: [PayrollService],
})
export class PayrollModule {}
