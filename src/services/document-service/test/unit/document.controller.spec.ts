import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { DocumentController } from '../../src/document/document.controller';
import { DocumentService } from '../../src/document/document.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockDocumentService = {
  generatePayslip: jest.fn(),
  generateTaxDocument: jest.fn(),
  generateCertificate: jest.fn(),
  getDocuments: jest.fn(),
  downloadDocument: jest.fn(),
  deleteDocument: jest.fn(),
  getAuditTrail: jest.fn(),
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
  status: 'active',
};

describe('DocumentController', () => {
  let controller: DocumentController;
  let service: typeof mockDocumentService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        { provide: DocumentService, useValue: mockDocumentService },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = mockDocumentService;
  });

  describe('POST /api/v1/documents/payslip', () => {
    it('should return 201 for HR user generating payslip', async () => {
      service.generatePayslip.mockResolvedValue(mockDocument);

      const result = await controller.generatePayslip(
        { employee_id: 'EMP001', period: '2024-01' },
        mockHrUser,
      );

      expect(result).toBeDefined();
      expect(result.type).toBe('payslip');
      expect(service.generatePayslip).toHaveBeenCalledWith('EMP001', '2024-01', mockHrUser);
    });

    it('should return 403 for non-HR user', async () => {
      service.generatePayslip.mockRejectedValue(
        new ForbiddenException('Only HR can generate payslips'),
      );

      await expect(
        controller.generatePayslip({ employee_id: 'EMP001', period: '2024-01' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('POST /api/v1/documents/tax-certificate', () => {
    it('should return 201 for HR generating tax certificate', async () => {
      const taxDoc = { ...mockDocument, type: 'tax_cert' };
      service.generateTaxDocument.mockResolvedValue(taxDoc);

      const result = await controller.generateTaxCertificate(
        { employee_id: 'EMP001', tax_year: '2024' },
        mockHrUser,
      );

      expect(result).toBeDefined();
      expect(result.type).toBe('tax_cert');
    });
  });

  describe('POST /api/v1/documents/employment-certificate', () => {
    it('should return 201 for employee generating their own certificate', async () => {
      const certDoc = { ...mockDocument, type: 'employment_cert' };
      service.generateCertificate.mockResolvedValue(certDoc);

      const result = await controller.generateEmploymentCertificate(
        { employee_id: 'EMP001', purpose: 'visa' },
        mockEmployeeUser,
      );

      expect(result).toBeDefined();
      expect(result.type).toBe('employment_cert');
    });
  });

  describe('GET /api/v1/documents/employee/:id', () => {
    it('should return 200 with paginated documents', async () => {
      const paginatedResult = {
        data: [mockDocument],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };
      service.getDocuments.mockResolvedValue(paginatedResult);

      const result = await controller.getEmployeeDocuments('EMP001', '1', '10');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(service.getDocuments).toHaveBeenCalledWith('EMP001', 1, 10);
    });
  });

  describe('GET /api/v1/documents/:id/download', () => {
    it('should return 200 with file stream', async () => {
      const downloadResult = {
        file_path: 'documents/payslips/EMP001_2024-01.html',
        mime_type: 'text/html',
        title: 'Payslip',
      };
      service.downloadDocument.mockResolvedValue(downloadResult);

      const result = await controller.downloadDocument('doc-001', mockEmployeeUser);

      expect(result.file_path).toBeDefined();
      expect(result.mime_type).toBe('text/html');
    });
  });

  describe('GET /api/v1/documents/:id/audit-trail', () => {
    it('should return 200 with audit log', async () => {
      const auditTrail = [
        { id: 'dl-001', document_id: 'doc-001', downloaded_by: 'EMP001', downloaded_at: new Date() },
      ];
      service.getAuditTrail.mockResolvedValue(auditTrail);

      const result = await controller.getAuditTrail('doc-001');

      expect(result).toHaveLength(1);
      expect(result[0].downloaded_by).toBe('EMP001');
    });
  });
});
