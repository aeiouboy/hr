import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { DocumentService } from '../../src/document/document.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PayslipGenerator } from '../../src/document/generators/payslip.generator';
import { TaxCertGenerator } from '../../src/document/generators/tax-cert.generator';
import { CertificateGenerator } from '../../src/document/generators/certificate.generator';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  document: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  documentDownload: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

const mockPayslipGenerator = {
  generate: jest.fn().mockReturnValue('<html>payslip</html>'),
  getFilePath: jest.fn().mockReturnValue('documents/payslips/EMP001_2024-01.html'),
};

const mockTaxCertGenerator = {
  generate: jest.fn().mockReturnValue('<html>tax cert</html>'),
  getFilePath: jest.fn().mockReturnValue('documents/tax-certs/EMP001_2024_50tawi.html'),
};

const mockCertificateGenerator = {
  generate: jest.fn().mockReturnValue('<html>certificate</html>'),
  getFilePath: jest.fn().mockReturnValue('documents/certificates/EMP001_cert_123.html'),
};

const mockHrUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'employee',
  firstName: 'John',
  lastName: 'Doe',
  roles: ['employee'],
};

const mockDocument = {
  id: 'doc-001',
  employee_id: 'EMP001',
  type: 'payslip',
  title: 'Payslip - 2024-01',
  file_path: 'documents/payslips/EMP001_2024-01.html',
  file_size: 500,
  mime_type: 'text/html',
  period: '2024-01',
  status: 'active',
  generated_by: 'HR001',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('DocumentService', () => {
  let service: DocumentService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PayslipGenerator, useValue: mockPayslipGenerator },
        { provide: TaxCertGenerator, useValue: mockTaxCertGenerator },
        { provide: CertificateGenerator, useValue: mockCertificateGenerator },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    prisma = mockPrismaService;
  });

  describe('generatePayslip', () => {
    it('should generate payslip for employee/period and return document record', async () => {
      prisma.document.create.mockResolvedValue(structuredClone(mockDocument));

      const result = await service.generatePayslip('EMP001', '2024-01', mockHrUser);

      expect(result).toBeDefined();
      expect(result.type).toBe('payslip');
      expect(result.employee_id).toBe('EMP001');
      expect(mockPayslipGenerator.generate).toHaveBeenCalled();
      expect(prisma.document.create).toHaveBeenCalled();
    });

    it('should reject if caller is not HR', async () => {
      await expect(
        service.generatePayslip('EMP001', '2024-01', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('generateTaxDocument', () => {
    it('should generate 50 Tawi tax form', async () => {
      const taxDoc = { ...mockDocument, type: 'tax_cert', title: '50 Tawi - 2024' };
      prisma.document.create.mockResolvedValue(structuredClone(taxDoc));

      const result = await service.generateTaxDocument('EMP001', '2024', mockHrUser);

      expect(result).toBeDefined();
      expect(result.type).toBe('tax_cert');
      expect(mockTaxCertGenerator.generate).toHaveBeenCalled();
    });

    it('should reject if caller is not HR', async () => {
      await expect(
        service.generateTaxDocument('EMP001', '2024', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('generateCertificate', () => {
    it('should generate employment certificate', async () => {
      const certDoc = { ...mockDocument, type: 'employment_cert', title: 'Employment Certificate' };
      prisma.document.create.mockResolvedValue(structuredClone(certDoc));

      const result = await service.generateCertificate('EMP001', 'visa application', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.type).toBe('employment_cert');
      expect(mockCertificateGenerator.generate).toHaveBeenCalled();
    });
  });

  describe('getDocuments', () => {
    it('should return document list with pagination', async () => {
      const docs = [structuredClone(mockDocument)];
      prisma.document.findMany.mockResolvedValue(docs);
      prisma.document.count.mockResolvedValue(1);

      const result = await service.getDocuments('EMP001', 1, 10);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });
  });

  describe('downloadDocument', () => {
    it('should return file stream and create audit log', async () => {
      prisma.document.findUnique.mockResolvedValue(structuredClone(mockDocument));
      prisma.documentDownload.create.mockResolvedValue({ id: 'dl-001' });

      const result = await service.downloadDocument('doc-001', mockEmployeeUser);

      expect(result.file_path).toBeDefined();
      expect(result.mime_type).toBe('text/html');
      expect(prisma.documentDownload.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            document_id: 'doc-001',
            downloaded_by: 'EMP001',
          }),
        }),
      );
    });

    it('should throw NotFoundException for deleted document', async () => {
      prisma.document.findUnique.mockResolvedValue({ ...mockDocument, status: 'deleted' });

      await expect(
        service.downloadDocument('doc-001', mockEmployeeUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteDocument', () => {
    it('should soft delete document (mark status as deleted)', async () => {
      prisma.document.findUnique.mockResolvedValue(structuredClone(mockDocument));
      prisma.document.update.mockResolvedValue({ ...mockDocument, status: 'deleted' });
      prisma.auditLog.create.mockResolvedValue({});

      const result = await service.deleteDocument('doc-001', mockHrUser);

      expect(result.status).toBe('deleted');
      expect(prisma.document.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'doc-001' },
          data: { status: 'deleted' },
        }),
      );
    });

    it('should throw NotFoundException for non-existent document', async () => {
      prisma.document.findUnique.mockResolvedValue(null);

      await expect(
        service.deleteDocument('nonexist', mockHrUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
