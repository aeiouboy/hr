import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { PayslipGenerator } from './generators/payslip.generator';
import { TaxCertGenerator } from './generators/tax-cert.generator';
import { CertificateGenerator } from './generators/certificate.generator';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payslipGenerator: PayslipGenerator,
    private readonly taxCertGenerator: TaxCertGenerator,
    private readonly certificateGenerator: CertificateGenerator,
  ) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async generatePayslip(employeeId: string, period: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can generate payslips');
    }

    const content = this.payslipGenerator.generate({
      employeeId,
      employeeName: 'Employee',
      period,
      baseSalary: 50000,
      allowances: 5000,
      deductions: 7500,
      netPay: 47500,
    });

    const filePath = this.payslipGenerator.getFilePath(employeeId, period);

    const document = await this.prisma.document.create({
      data: {
        employee_id: employeeId,
        type: 'payslip',
        title: `Payslip - ${period}`,
        file_path: filePath,
        file_size: Buffer.byteLength(content, 'utf-8'),
        mime_type: 'text/html',
        period,
        status: 'active',
        generated_by: currentUser.id,
      },
    });

    return document;
  }

  async generateTaxDocument(employeeId: string, taxYear: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can generate tax documents');
    }

    const content = this.taxCertGenerator.generate({
      employeeId,
      employeeName: 'Employee',
      nationalId: '***********',
      taxYear,
      totalIncome: 600000,
      totalTax: 25000,
      socialSecurity: 9000,
      providentFund: 30000,
    });

    const filePath = this.taxCertGenerator.getFilePath(employeeId, taxYear);

    const document = await this.prisma.document.create({
      data: {
        employee_id: employeeId,
        type: 'tax_cert',
        title: `50 Tawi - ${taxYear}`,
        file_path: filePath,
        file_size: Buffer.byteLength(content, 'utf-8'),
        mime_type: 'text/html',
        period: taxYear,
        status: 'active',
        generated_by: currentUser.id,
      },
    });

    return document;
  }

  async generateCertificate(employeeId: string, purpose: string | undefined, currentUser: CurrentUserInterface) {
    const content = this.certificateGenerator.generate({
      employeeId,
      employeeName: 'Employee',
      position: 'Staff',
      department: 'Department',
      hireDate: '2020-01-01',
      purpose,
      issueDate: new Date().toISOString().split('T')[0],
    });

    const filePath = this.certificateGenerator.getFilePath(employeeId);

    const document = await this.prisma.document.create({
      data: {
        employee_id: employeeId,
        type: 'employment_cert',
        title: 'Employment Certificate',
        file_path: filePath,
        file_size: Buffer.byteLength(content, 'utf-8'),
        mime_type: 'text/html',
        status: 'active',
        generated_by: currentUser.id,
      },
    });

    return document;
  }

  async getDocuments(employeeId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where: { employee_id: employeeId, status: { not: 'deleted' } },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.document.count({
        where: { employee_id: employeeId, status: { not: 'deleted' } },
      }),
    ]);

    return {
      data: documents,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async downloadDocument(documentId: string, currentUser: CurrentUserInterface) {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.status === 'deleted') {
      throw new NotFoundException('Document not found');
    }

    await this.prisma.documentDownload.create({
      data: {
        document_id: documentId,
        downloaded_by: currentUser.id,
        ip_address: '127.0.0.1',
      },
    });

    return {
      file_path: document.file_path,
      mime_type: document.mime_type,
      title: document.title,
    };
  }

  async deleteDocument(documentId: string, currentUser: CurrentUserInterface) {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const updated = await this.prisma.document.update({
      where: { id: documentId },
      data: { status: 'deleted' },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'document',
        entity_id: documentId,
        action: 'delete_document',
        performed_by: currentUser.id,
        changes: { status: 'deleted' },
      },
    });

    return updated;
  }

  async getAuditTrail(documentId: string) {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return this.prisma.documentDownload.findMany({
      where: { document_id: documentId },
      orderBy: { downloaded_at: 'desc' },
    });
  }
}
