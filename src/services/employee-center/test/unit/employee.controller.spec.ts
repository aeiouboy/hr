import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EmployeeController } from '../../src/employee/employee.controller';
import { EmployeeService } from '../../src/employee/employee.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock employee service
const mockEmployeeService = {
  findById: jest.fn(),
  updatePersonalInfo: jest.fn(),
  updateContactInfo: jest.fn(),
  getEmployment: jest.fn(),
  listEmergencyContacts: jest.fn(),
  createEmergencyContact: jest.fn(),
  updateEmergencyContact: jest.fn(),
  deleteEmergencyContact: jest.fn(),
  listDependents: jest.fn(),
  createDependent: jest.fn(),
  updateDependent: jest.fn(),
  deleteDependent: jest.fn(),
  getWorkPermits: jest.fn(),
};

const mockEmployeeUser: CurrentUserInterface= {
  id: 'EMP001',
  email: 'chongrak.t@centralgroup.com',
  username: 'chongrak.t',
  firstName: 'Chongrak',
  lastName: 'Tanaka',
  roles: ['employee'],
};

const mockHrAdminUser: CurrentUserInterface= {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockEmployeeData = {
  id: 'EMP001',
  first_name_en: 'Chongrak',
  first_name_th: 'จงรักษ์',
  last_name_en: 'Tanaka',
  last_name_th: 'ทานากะ',
  gender: 'male',
  date_of_birth: new Date('1988-05-12'),
  national_id: '*********0123',
  email: 'chongrak.t@centralgroup.com',
  employment: {
    job_title: 'Product Manager',
    department: 'Product Management',
    division: 'RIS',
    manager: { first_name_en: 'Rungrote', last_name_en: 'Amnuaysopon' },
  },
};

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: typeof mockEmployeeService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = mockEmployeeService;
  });

  describe('GET /api/v1/employees/:id', () => {
    it('should return 200 with employee data', async () => {
      service.findById.mockResolvedValue(mockEmployeeData);

      const result = await controller.findById('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('EMP001');
      expect(result.first_name_en).toBe('Chongrak');
      expect(result.last_name_en).toBe('Tanaka');
      expect(service.findById).toHaveBeenCalledWith('EMP001', mockEmployeeUser);
    });

    it('should return 404 when employee not found', async () => {
      service.findById.mockRejectedValue(new NotFoundException('Employee not found'));

      await expect(controller.findById('NONEXIST', mockEmployeeUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return 403 when employee tries to access another employees data without permission', async () => {
      service.findById.mockRejectedValue(
        new ForbiddenException('Access denied'),
      );

      const otherUser: CurrentUserInterface= { ...mockEmployeeUser, id: 'EMP999' };
      await expect(controller.findById('EMP001', otherUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('PATCH /api/v1/employees/:id/personal-info', () => {
    const updateDto = {
      first_name_en: 'Updated',
      gender: 'male',
    };

    it('should return 200 with updated personal info', async () => {
      const updatedData = { ...mockEmployeeData, first_name_en: 'Updated' };
      service.updatePersonalInfo.mockResolvedValue(updatedData);

      const result = await controller.updatePersonalInfo('EMP001', updateDto, mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result.first_name_en).toBe('Updated');
      expect(service.updatePersonalInfo).toHaveBeenCalledWith('EMP001', updateDto, mockHrAdminUser);
    });

    it('should return 400 for invalid input (missing required fields)', async () => {
      service.updatePersonalInfo.mockRejectedValue(
        new BadRequestException('Validation failed'),
      );

      await expect(
        controller.updatePersonalInfo('EMP001', {} as any, mockHrAdminUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return 403 when non-HR tries to update', async () => {
      service.updatePersonalInfo.mockRejectedValue(
        new ForbiddenException('Only HR can update personal info'),
      );

      await expect(
        controller.updatePersonalInfo('EMP001', updateDto, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('PATCH /api/v1/employees/:id/contact-info', () => {
    const contactDto = {
      email: 'new@centralgroup.com',
      personal_mobile: '+66 91 111 2222',
    };

    it('should return 200 for self-update', async () => {
      const updatedData = { ...mockEmployeeData, email: 'new@centralgroup.com' };
      service.updateContactInfo.mockResolvedValue(updatedData);

      const result = await controller.updateContactInfo('EMP001', contactDto, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.email).toBe('new@centralgroup.com');
      expect(service.updateContactInfo).toHaveBeenCalledWith('EMP001', contactDto, mockEmployeeUser);
    });

    it('should return 200 for HR updating any employee', async () => {
      const updatedData = { ...mockEmployeeData, ...contactDto };
      service.updateContactInfo.mockResolvedValue(updatedData);

      const result = await controller.updateContactInfo('EMP001', contactDto, mockHrAdminUser);

      expect(result).toBeDefined();
    });

    it('should return 403 when employee updates another employee', async () => {
      service.updateContactInfo.mockRejectedValue(
        new ForbiddenException('Cannot update another employee\'s contact info'),
      );

      const otherUser: CurrentUserInterface= { ...mockEmployeeUser, id: 'EMP999' };
      await expect(
        controller.updateContactInfo('EMP001', contactDto, otherUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('GET /api/v1/employees/:id/employment', () => {
    const mockEmployment = {
      hire_date: new Date('2015-04-01'),
      status: 'active',
      job_title: 'Product Manager',
      department: 'Product Management',
      division: 'RIS',
      manager: { first_name_en: 'Rungrote', last_name_en: 'Amnuaysopon' },
      position_id: '40128307',
    };

    it('should return 200 with employment details', async () => {
      service.getEmployment.mockResolvedValue(mockEmployment);

      const result = await controller.getEmployment('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.hire_date).toEqual(new Date('2015-04-01'));
      expect(result.status).toBe('active');
    });

    it('should include position, department, division, manager', async () => {
      service.getEmployment.mockResolvedValue(mockEmployment);

      const result = await controller.getEmployment('EMP001', mockEmployeeUser);

      expect(result.job_title).toBe('Product Manager');
      expect(result.department).toBe('Product Management');
      expect(result.division).toBe('RIS');
      expect((result as any).manager).toBeDefined();
      expect((result as any).manager.first_name_en).toBe('Rungrote');
    });
  });

  describe('POST /api/v1/employees/:id/emergency-contacts', () => {
    const newContact = {
      name: 'Jane Doe',
      relationship: 'sibling',
      phone: '+66 81 234 5678',
    };

    it('should return 201 when creating new contact', async () => {
      const created = { id: 'ec_003', employee_id: 'EMP001', ...newContact, is_primary: false };
      service.createEmergencyContact.mockResolvedValue(created);

      const result = await controller.createEmergencyContact('EMP001', newContact, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('ec_003');
      expect(result.name).toBe('Jane Doe');
      expect(service.createEmergencyContact).toHaveBeenCalledWith('EMP001', newContact, mockEmployeeUser);
    });

    it('should validate required fields (name, relationship, phone)', async () => {
      const invalidContact = { name: 'Jane' }; // missing relationship and phone
      service.createEmergencyContact.mockRejectedValue(
        new BadRequestException('relationship and phone are required'),
      );

      await expect(
        controller.createEmergencyContact('EMP001', invalidContact as any, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('DELETE /api/v1/employees/:id/emergency-contacts/:contactId', () => {
    it('should return 200 when deleting contact', async () => {
      service.deleteEmergencyContact.mockResolvedValue({ success: true });

      const result = await controller.deleteEmergencyContact('EMP001', 'ec_001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(service.deleteEmergencyContact).toHaveBeenCalledWith('EMP001', 'ec_001', mockEmployeeUser);
    });

    it('should return 404 for non-existent contact', async () => {
      service.deleteEmergencyContact.mockRejectedValue(
        new NotFoundException('Emergency contact not found'),
      );

      await expect(
        controller.deleteEmergencyContact('EMP001', 'nonexist', mockEmployeeUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/employees/:id/dependents', () => {
    const newDependent = {
      name: 'Kai Tanaka',
      relationship_type: 'child',
      date_of_birth: '2023-01-15',
    };

    it('should return 201 when creating new dependent', async () => {
      const created = { id: 'dep_003', employee_id: 'EMP001', ...newDependent, gender: 'male' };
      service.createDependent.mockResolvedValue(created);

      const result = await controller.createDependent('EMP001', newDependent, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('dep_003');
      expect(result.name).toBe('Kai Tanaka');
      expect(result.relationship_type).toBe('child');
    });

    it('should validate relationship type enum', async () => {
      const invalidDependent = {
        name: 'Test',
        relationship_type: 'invalid_type',
        date_of_birth: '2020-01-01',
      };
      service.createDependent.mockRejectedValue(
        new BadRequestException('Invalid relationship_type. Must be one of: spouse, child, parent, sibling, other'),
      );

      await expect(
        controller.createDependent('EMP001', invalidDependent, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('GET /api/v1/employees/:id/work-permits', () => {
    const mockWorkPermits = [
      {
        id: 'wp_001',
        permit_type: 'non_immigrant_b',
        permit_number: 'WP-2024-123456',
        issue_date: new Date('2024-01-15'),
        expiry_date: new Date('2026-03-20'),
        issuing_country: 'Thailand',
      },
    ];

    it('should return 200 for HR users', async () => {
      service.getWorkPermits.mockResolvedValue(mockWorkPermits);

      const result = await controller.getWorkPermits('EMP001', mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].permit_number).toBe('WP-2024-123456');
    });

    it('should return 403 for non-HR users', async () => {
      service.getWorkPermits.mockRejectedValue(
        new ForbiddenException('Only HR can view work permits'),
      );

      await expect(
        controller.getWorkPermits('EMP001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
