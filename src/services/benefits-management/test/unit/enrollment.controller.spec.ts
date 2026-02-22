import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { EnrollmentController } from '../../src/enrollment/enrollment.controller';
import { EnrollmentService } from '../../src/enrollment/enrollment.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockEnrollmentService = {
  enroll: jest.fn(),
  getByEmployee: jest.fn(),
  cancel: jest.fn(),
  addDependent: jest.fn(),
  removeDependent: jest.fn(),
  getDependents: jest.fn(),
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
  username: 'emp.user',
  firstName: 'Employee',
  lastName: 'User',
  roles: ['employee'],
};

const mockEnrollment = {
  id: 'enroll-1',
  employee_id: 'EMP001',
  plan_id: 'plan-1',
  coverage_level: 'individual',
  status: 'active',
};

describe('EnrollmentController', () => {
  let controller: EnrollmentController;
  let service: typeof mockEnrollmentService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentController],
      providers: [
        { provide: EnrollmentService, useValue: mockEnrollmentService },
      ],
    }).compile();

    controller = module.get<EnrollmentController>(EnrollmentController);
    service = mockEnrollmentService;
  });

  describe('POST /enrollments', () => {
    it('should enroll employee', async () => {
      service.enroll.mockResolvedValue(mockEnrollment);
      const result = await controller.enroll(
        { employee_id: 'EMP001', plan_id: 'plan-1', coverage_level: 'individual', effective_date: '2026-01-01' } as any,
        mockEmployeeUser,
      );
      expect(result).toEqual(mockEnrollment);
    });

    it('should throw ForbiddenException for unauthorized enrollment', async () => {
      service.enroll.mockRejectedValue(new ForbiddenException());
      await expect(controller.enroll(
        { employee_id: 'EMP002', plan_id: 'plan-1', coverage_level: 'individual', effective_date: '2026-01-01' } as any,
        mockEmployeeUser,
      )).rejects.toThrow(ForbiddenException);
    });
  });

  describe('GET /enrollments/employee/:id', () => {
    it('should return employee enrollments', async () => {
      service.getByEmployee.mockResolvedValue([mockEnrollment]);
      const result = await controller.getByEmployee('EMP001', mockEmployeeUser);
      expect(result).toHaveLength(1);
    });

    it('should throw ForbiddenException for unauthorized access', async () => {
      service.getByEmployee.mockRejectedValue(new ForbiddenException());
      await expect(controller.getByEmployee('EMP002', mockEmployeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('DELETE /enrollments/:id', () => {
    it('should cancel enrollment', async () => {
      service.cancel.mockResolvedValue({ ...mockEnrollment, status: 'cancelled' });
      const result = await controller.cancel('enroll-1', 'No longer needed', mockEmployeeUser);
      expect(result.status).toBe('cancelled');
    });

    it('should throw NotFoundException for invalid enrollment', async () => {
      service.cancel.mockRejectedValue(new NotFoundException());
      await expect(controller.cancel('invalid', 'reason', mockHrUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /enrollments/:id/dependents', () => {
    it('should add dependent to enrollment', async () => {
      const dependent = { id: 'dep-1', name: 'Jane', relationship: 'spouse' };
      service.addDependent.mockResolvedValue(dependent);
      const result = await controller.addDependent('enroll-1', { name: 'Jane', relationship: 'spouse' } as any, mockEmployeeUser);
      expect(result.id).toBe('dep-1');
    });

    it('should throw NotFoundException for invalid enrollment', async () => {
      service.addDependent.mockRejectedValue(new NotFoundException());
      await expect(controller.addDependent('invalid', { name: 'Jane', relationship: 'spouse' } as any, mockHrUser)).rejects.toThrow(NotFoundException);
    });
  });
});
