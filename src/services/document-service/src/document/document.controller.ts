import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { GeneratePayslipDto } from './dto/generate-payslip.dto';
import { GenerateTaxCertDto } from './dto/generate-tax-cert.dto';
import { GenerateCertificateDto } from './dto/generate-certificate.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('payslip')
  async generatePayslip(
    @Body() dto: GeneratePayslipDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.documentService.generatePayslip(dto.employee_id, dto.period, currentUser);
  }

  @Post('tax-certificate')
  async generateTaxCertificate(
    @Body() dto: GenerateTaxCertDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.documentService.generateTaxDocument(dto.employee_id, dto.tax_year, currentUser);
  }

  @Post('employment-certificate')
  async generateEmploymentCertificate(
    @Body() dto: GenerateCertificateDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.documentService.generateCertificate(dto.employee_id, dto.purpose, currentUser);
  }

  @Get('employee/:id')
  async getEmployeeDocuments(
    @Param('id') employeeId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.documentService.getDocuments(
      employeeId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get(':id/download')
  async downloadDocument(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.documentService.downloadDocument(id, currentUser);
  }

  @Get(':id/audit-trail')
  async getAuditTrail(@Param('id') id: string) {
    return this.documentService.getAuditTrail(id);
  }

  @Delete(':id')
  async deleteDocument(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.documentService.deleteDocument(id, currentUser);
  }
}
