import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Integration tests for Payroll Management service.
 * Verify modules wire together correctly with mocked Prisma.
 */

const mockPrismaService = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  onModuleInit: jest.fn(),
  onModuleDestroy: jest.fn(),
  payrollRun: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  payslip: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    count: jest.fn(),
    deleteMany: jest.fn(),
    updateMany: jest.fn(),
  },
  compensation: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  taxDeduction: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    upsert: jest.fn(),
  },
  governmentReport: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('Payroll Management Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env['PAYROLL_ENCRYPTION_KEY'] = 'integration-test-key-32chars!!';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    delete process.env['PAYROLL_ENCRYPTION_KEY'];
  });

  it('should bootstrap the application', () => {
    expect(app).toBeDefined();
  });

  it('should have PayrollService available', () => {
    const { PayrollService } = require('../../src/payroll/payroll.service');
    const service = app.get(PayrollService);
    expect(service).toBeDefined();
  });

  it('should have TaxService available', () => {
    const { TaxService } = require('../../src/tax/tax.service');
    const service = app.get(TaxService);
    expect(service).toBeDefined();
  });

  it('should have CompensationService available', () => {
    const { CompensationService } = require('../../src/compensation/compensation.service');
    const service = app.get(CompensationService);
    expect(service).toBeDefined();
  });

  it('should have GovernmentService available', () => {
    const { GovernmentService } = require('../../src/government/government.service');
    const service = app.get(GovernmentService);
    expect(service).toBeDefined();
  });

  it('should have EncryptionService available', () => {
    const { EncryptionService } = require('../../src/encryption/encryption.service');
    const service = app.get(EncryptionService);
    expect(service).toBeDefined();
  });

  describe('TaxService calculations', () => {
    it('should calculate monthly withholding', () => {
      const { TaxService } = require('../../src/tax/tax.service');
      const taxService = app.get(TaxService);

      const annualSalary = 85000 * 12; // 1,020,000 annual
      const monthlyTax = taxService.calculateMonthlyWithholding(annualSalary);

      expect(monthlyTax).toBeGreaterThan(0);
      expect(monthlyTax).toBeLessThan(85000);
    });
  });

  describe('EncryptionService round-trip', () => {
    it('should encrypt and decrypt salary data', () => {
      const { EncryptionService } = require('../../src/encryption/encryption.service');
      const encService = app.get(EncryptionService);

      const salary = '85000.50';
      const encrypted = encService.encrypt(salary);
      const decrypted = encService.decrypt(encrypted);

      expect(decrypted).toBe(salary);
      expect(encrypted).not.toBe(salary);
    });
  });
});
