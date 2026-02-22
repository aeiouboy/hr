import { EnrollmentService } from '../../src/enrollment/enrollment.service';
import { ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';

const mockPrisma = {
  benefitPlan: {
    findUnique: jest.fn(),
  },
  benefitEnrollment: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  benefitDependent: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const hrUser = { id: 'HR001', email: 'hr@test.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'] };
const employeeUser = { id: 'EMP001', email: 'emp@test.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'] };
const otherEmployee = { id: 'EMP002', email: 'emp2@test.com', username: 'emp2', firstName: 'Other', lastName: 'User', roles: ['employee'] };

const mockPlan = { id: 'plan-1', code: 'HEALTH-001', is_active: true };
const mockEnrollment = {
  id: 'enroll-1',
  employee_id: 'EMP001',
  plan_id: 'plan-1',
  coverage_level: 'individual',
  status: 'active',
  effective_date: new Date('2026-01-01'),
};

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new EnrollmentService(mockPrisma as any);
  });

  describe('enroll', () => {
    const enrollDto = {
      employee_id: 'EMP001',
      plan_id: 'plan-1',
      coverage_level: 'individual',
      effective_date: '2026-01-01',
    };

    it('should enroll employee in a plan', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(mockPlan);
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(null);
      mockPrisma.benefitEnrollment.create.mockResolvedValue({ id: 'enroll-1', ...enrollDto, plan: mockPlan });
      const result = await service.enroll(enrollDto as any, employeeUser as any);
      expect(result.id).toBe('enroll-1');
    });

    it('should allow HR to enroll on behalf of employee', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(mockPlan);
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(null);
      mockPrisma.benefitEnrollment.create.mockResolvedValue({ id: 'enroll-2', ...enrollDto });
      await expect(service.enroll(enrollDto as any, hrUser as any)).resolves.toBeDefined();
    });

    it('should reject non-HR enrolling others', async () => {
      await expect(
        service.enroll(enrollDto as any, otherEmployee as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for invalid plan', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(null);
      await expect(
        service.enroll(enrollDto as any, employeeUser as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException for inactive plan', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue({ ...mockPlan, is_active: false });
      await expect(
        service.enroll(enrollDto as any, employeeUser as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException for duplicate enrollment', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(mockPlan);
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      await expect(
        service.enroll(enrollDto as any, employeeUser as any),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('getByEmployee', () => {
    it('should return enrollments for own employee', async () => {
      mockPrisma.benefitEnrollment.findMany.mockResolvedValue([mockEnrollment]);
      const result = await service.getByEmployee('EMP001', employeeUser as any);
      expect(result).toHaveLength(1);
    });

    it('should allow HR to view any employee enrollments', async () => {
      mockPrisma.benefitEnrollment.findMany.mockResolvedValue([]);
      await expect(service.getByEmployee('EMP001', hrUser as any)).resolves.toBeDefined();
    });

    it('should reject employee viewing others enrollments', async () => {
      await expect(
        service.getByEmployee('EMP001', otherEmployee as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('cancel', () => {
    it('should cancel enrollment for own employee', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      mockPrisma.benefitEnrollment.update.mockResolvedValue({ ...mockEnrollment, status: 'cancelled' });
      const result = await service.cancel('enroll-1', 'No longer needed', employeeUser as any);
      expect(result.status).toBe('cancelled');
    });

    it('should allow HR to cancel enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      mockPrisma.benefitEnrollment.update.mockResolvedValue({ ...mockEnrollment, status: 'cancelled' });
      await expect(service.cancel('enroll-1', 'Terminated', hrUser as any)).resolves.toBeDefined();
    });

    it('should throw NotFoundException for invalid enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(null);
      await expect(
        service.cancel('invalid', 'reason', hrUser as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject non-HR cancelling others enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      await expect(
        service.cancel('enroll-1', 'reason', otherEmployee as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException for already cancelled enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue({ ...mockEnrollment, status: 'cancelled' });
      await expect(
        service.cancel('enroll-1', 'reason', employeeUser as any),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('addDependent', () => {
    const dependentDto = { name: 'Jane Doe', relationship: 'spouse' };

    it('should add dependent to own enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      mockPrisma.benefitDependent.create.mockResolvedValue({ id: 'dep-1', ...dependentDto, enrollment_id: 'enroll-1' });
      const result = await service.addDependent('enroll-1', dependentDto as any, employeeUser as any);
      expect(result.id).toBe('dep-1');
    });

    it('should allow HR to add dependent', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      mockPrisma.benefitDependent.create.mockResolvedValue({ id: 'dep-2', ...dependentDto });
      await expect(service.addDependent('enroll-1', dependentDto as any, hrUser as any)).resolves.toBeDefined();
    });

    it('should throw NotFoundException for invalid enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(null);
      await expect(
        service.addDependent('invalid', dependentDto as any, hrUser as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject non-HR adding to others enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      await expect(
        service.addDependent('enroll-1', dependentDto as any, otherEmployee as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('removeDependent', () => {
    const mockDependent = { id: 'dep-1', enrollment_id: 'enroll-1', enrollment: mockEnrollment };

    it('should deactivate dependent for own enrollment', async () => {
      mockPrisma.benefitDependent.findUnique.mockResolvedValue(mockDependent);
      mockPrisma.benefitDependent.update.mockResolvedValue({ ...mockDependent, is_active: false });
      const result = await service.removeDependent('dep-1', employeeUser as any);
      expect(result.is_active).toBe(false);
    });

    it('should throw NotFoundException for invalid dependent', async () => {
      mockPrisma.benefitDependent.findUnique.mockResolvedValue(null);
      await expect(
        service.removeDependent('invalid', hrUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getDependents', () => {
    it('should return active dependents for enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(mockEnrollment);
      mockPrisma.benefitDependent.findMany.mockResolvedValue([{ id: 'dep-1', name: 'Jane' }]);
      const result = await service.getDependents('enroll-1');
      expect(result).toHaveLength(1);
    });

    it('should throw NotFoundException for invalid enrollment', async () => {
      mockPrisma.benefitEnrollment.findUnique.mockResolvedValue(null);
      await expect(service.getDependents('invalid')).rejects.toThrow(NotFoundException);
    });
  });
});
