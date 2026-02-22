import { CompensationService } from '../../src/compensation/compensation.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const mockPrisma = {
  compensation: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const mockEncryption = {
  encrypt: jest.fn((val: string) => `encrypted_${val}`),
  decrypt: jest.fn((val: string) => val.replace('encrypted_', '')),
};

const hrUser = { id: 'user-1', roles: ['hr_admin'], employee_id: 'EMP001' };
const employeeUser = { id: 'EMP003', roles: ['employee'], employee_id: 'EMP003' };

describe('CompensationService', () => {
  let service: CompensationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CompensationService(mockPrisma as any, mockEncryption as any);
  });

  describe('findByEmployeeId', () => {
    it('should return decrypted compensation for HR', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue({
        employee_id: 'EMP003',
        base_salary: 'encrypted_50000',
        position_allowance: 5000,
      });

      const result = await service.findByEmployeeId('EMP003', hrUser as any);
      expect(result.base_salary).toBe(50000);
    });

    it('should allow employee to view own compensation', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue({
        employee_id: 'EMP003',
        base_salary: 'encrypted_50000',
      });

      const result = await service.findByEmployeeId('EMP003', employeeUser as any);
      expect(result.base_salary).toBe(50000);
    });

    it('should reject employee viewing others compensation', async () => {
      await expect(
        service.findByEmployeeId('EMP001', employeeUser as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw if not found', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue(null);
      await expect(
        service.findByEmployeeId('EMP999', hrUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create compensation with encrypted salary', async () => {
      const dto = {
        employee_id: 'EMP003',
        base_salary: 50000,
        position_allowance: 5000,
        effective_date: '2025-01-01',
      };
      mockPrisma.compensation.create.mockResolvedValue({ id: 'comp-1', ...dto });

      await service.create(dto, hrUser as any);
      expect(mockEncryption.encrypt).toHaveBeenCalledWith('50000');
      expect(mockPrisma.compensation.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          employee_id: 'EMP003',
          base_salary: 'encrypted_50000',
          position_allowance: 5000,
        }),
      });
    });

    it('should reject non-HR', async () => {
      await expect(
        service.create({}, employeeUser as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update compensation and encrypt salary if changed', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue({ employee_id: 'EMP003' });
      mockPrisma.compensation.update.mockResolvedValue({ employee_id: 'EMP003', base_salary: 'encrypted_60000' });

      await service.update('EMP003', { base_salary: 60000 }, hrUser as any);
      expect(mockEncryption.encrypt).toHaveBeenCalledWith('60000');
    });

    it('should throw if not found', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue(null);
      await expect(
        service.update('EMP999', {}, hrUser as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject non-HR', async () => {
      await expect(
        service.update('EMP003', {}, employeeUser as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getDecryptedBaseSalary', () => {
    it('should return decrypted numeric salary', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue({
        base_salary: 'encrypted_75000',
      });

      const result = await service.getDecryptedBaseSalary('EMP003');
      expect(result).toBe(75000);
    });

    it('should throw if not found', async () => {
      mockPrisma.compensation.findUnique.mockResolvedValue(null);
      await expect(service.getDecryptedBaseSalary('EMP999')).rejects.toThrow(NotFoundException);
    });
  });
});
