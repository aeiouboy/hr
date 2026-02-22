import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { EmployeeService } from '../../src/employee/employee.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  employee: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  emergencyContact: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  dependent: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  workPermit: {
    findMany: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

// Mock user fixtures
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

const mockHrManagerUser: CurrentUserInterface= {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockManagerUser: CurrentUserInterface= {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Manager',
  lastName: 'User',
  roles: ['manager'],
};

// Mock employee record from database
const mockEmployeeRecord = {
  id: 'EMP001',
  employee_id: 'EMP001',
  first_name_en: 'Chongrak',
  first_name_th: 'จงรักษ์',
  last_name_en: 'Tanaka',
  last_name_th: 'ทานากะ',
  nickname: 'Chong',
  gender: 'male',
  date_of_birth: new Date('1988-05-12'),
  nationality: 'Thai',
  national_id: '1234567890123',
  religion: 'buddhist',
  blood_type: 'O+',
  marital_status: 'married',
  email: 'chongrak.t@centralgroup.com',
  personal_email: 'chongrak.tanaka@gmail.com',
  business_phone: '+66 2 021 9000',
  personal_mobile: '+66 89 123 4567',
  addresses: [
    {
      id: 'addr_001',
      address_type: 'permanent',
      address_line_1: '123/45 Sukhumvit Road',
      province: 'Bangkok',
      postal_code: '10110',
      country: 'Thailand',
    },
  ],
  employment: {
    hire_date: new Date('2015-04-01'),
    status: 'active',
    probation_end_date: new Date('2015-07-01'),
    job_title: 'Product Manager',
    department: 'Product Management',
    division: 'RIS',
    location: 'Silom Tower',
    position_id: '40128307',
    grade: 'TL3',
    level: 'Senior',
    manager_id: 'EMP_SUP001',
    manager: {
      id: 'EMP_SUP001',
      first_name_en: 'Rungrote',
      last_name_en: 'Amnuaysopon',
    },
  },
  emergency_contacts: [
    {
      id: 'ec_001',
      name: 'Yuki Tanaka',
      relationship: 'spouse',
      phone: '+66 82 345 6789',
      is_primary: true,
    },
  ],
  dependents: [
    {
      id: 'dep_001',
      name: 'Yuki Tanaka',
      relationship_type: 'spouse',
      date_of_birth: new Date('1990-03-15'),
      gender: 'female',
    },
  ],
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    // Reset all mocks
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = mockPrismaService;
  });

  describe('findById', () => {
    it('should return employee profile with personal info for valid ID', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.findById('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('EMP001');
      expect(result.first_name_en).toBe('Chongrak');
      expect(result.first_name_th).toBe('จงรักษ์');
      expect(result.last_name_en).toBe('Tanaka');
      expect(result.gender).toBe('male');
      expect(result.date_of_birth).toEqual(new Date('1988-05-12'));
    });

    it('should throw NotFoundException for non-existent employee', async () => {
      prisma.employee.findUnique.mockResolvedValue(null);

      await expect(service.findById('NONEXIST', mockEmployeeUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should mask national_id when caller is not HR', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.findById('EMP001', mockEmployeeUser);

      expect(result.national_id).not.toBe('1234567890123');
      expect(result.national_id).toBe('*********0123');
    });

    it('should show full national_id when caller is HR admin', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.findById('EMP001', mockHrAdminUser);

      expect(result.national_id).toBe('1234567890123');
    });

    it('should show full national_id when caller is HR manager', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.findById('EMP001', mockHrManagerUser);

      expect(result.national_id).toBe('1234567890123');
    });

    it('should include employment info (position, department, manager)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.findById('EMP001', mockHrAdminUser);

      expect(result.employment).toBeDefined();
      expect(result.employment.job_title).toBe('Product Manager');
      expect(result.employment.department).toBe('Product Management');
      expect((result.employment as any).manager).toBeDefined();
      expect((result.employment as any).manager.first_name_en).toBe('Rungrote');
    });

    it('should include contact info (email, phone, address)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.findById('EMP001', mockEmployeeUser);

      expect(result.email).toBe('chongrak.t@centralgroup.com');
      expect(result.personal_mobile).toBe('+66 89 123 4567');
      expect(result.addresses).toBeDefined();
      expect(result.addresses).toHaveLength(1);
    });
  });

  describe('updatePersonalInfo', () => {
    const updateDto = {
      first_name_en: 'UpdatedName',
      gender: 'male',
      date_of_birth: '1988-05-12',
      nationality: 'Thai',
      religion: 'buddhist',
      blood_type: 'O+',
      marital_status: 'married',
    };

    it('should update personal info fields (name, DOB, gender, nationality, religion, blood_type, marital_status)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));
      prisma.employee.update.mockResolvedValue({
        ...mockEmployeeRecord,
        first_name_en: 'UpdatedName',
      });

      const result = await service.updatePersonalInfo('EMP001', updateDto, mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result.first_name_en).toBe('UpdatedName');
      expect(prisma.employee.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'EMP001' },
          data: expect.objectContaining({ first_name_en: 'UpdatedName' }),
        }),
      );
    });

    it('should reject update if caller is not HR admin/HR manager', async () => {
      await expect(
        service.updatePersonalInfo('EMP001', updateDto, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject update if caller is regular employee trying to edit another employee', async () => {
      const otherEmployee: CurrentUserInterface= {
        ...mockEmployeeUser,
        id: 'EMP999',
      };

      await expect(
        service.updatePersonalInfo('EMP001', updateDto, otherEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should create audit log entry for every change', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));
      prisma.employee.update.mockResolvedValue({
        ...mockEmployeeRecord,
        first_name_en: 'UpdatedName',
      });

      await service.updatePersonalInfo('EMP001', updateDto, mockHrAdminUser);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'employee',
            entity_id: 'EMP001',
            action: 'update_personal_info',
            performed_by: 'HR001',
          }),
        }),
      );
    });

    it('should validate required fields', async () => {
      const invalidDto = { first_name_en: '' };

      await expect(
        service.updatePersonalInfo('EMP001', invalidDto as any, mockHrAdminUser),
      ).rejects.toThrow();
    });
  });

  describe('updateContactInfo', () => {
    const contactDto = {
      email: 'new.email@centralgroup.com',
      personal_mobile: '+66 91 111 2222',
    };

    it('should allow employee to update their own contact info (email, phone, address)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));
      prisma.employee.update.mockResolvedValue({
        ...mockEmployeeRecord,
        email: 'new.email@centralgroup.com',
        personal_mobile: '+66 91 111 2222',
      });

      const result = await service.updateContactInfo('EMP001', contactDto, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.email).toBe('new.email@centralgroup.com');
      expect(result.personal_mobile).toBe('+66 91 111 2222');
    });

    it('should allow HR to update any employee contact info', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));
      prisma.employee.update.mockResolvedValue({
        ...mockEmployeeRecord,
        ...contactDto,
      });

      const result = await service.updateContactInfo('EMP001', contactDto, mockHrAdminUser);

      expect(result).toBeDefined();
      expect(prisma.employee.update).toHaveBeenCalled();
    });

    it('should reject if employee tries to update another employee contact', async () => {
      const otherEmployee: CurrentUserInterface= {
        ...mockEmployeeUser,
        id: 'EMP999',
      };

      await expect(
        service.updateContactInfo('EMP001', contactDto, otherEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should create audit log entry', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));
      prisma.employee.update.mockResolvedValue({
        ...mockEmployeeRecord,
        ...contactDto,
      });

      await service.updateContactInfo('EMP001', contactDto, mockEmployeeUser);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'employee',
            entity_id: 'EMP001',
            action: 'update_contact_info',
            performed_by: 'EMP001',
          }),
        }),
      );
    });
  });

  describe('getEmployment', () => {
    it('should return employment details (hire_date, status, probation_end, job_title, department, division, location)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.getEmployment('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.hire_date).toEqual(new Date('2015-04-01'));
      expect(result.status).toBe('active');
      expect(result.probation_end_date).toEqual(new Date('2015-07-01'));
      expect(result.job_title).toBe('Product Manager');
      expect(result.department).toBe('Product Management');
      expect(result.division).toBe('RIS');
      expect(result.location).toBe('Silom Tower');
    });

    it('should include org hierarchy (manager chain)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.getEmployment('EMP001', mockEmployeeUser);

      expect((result as any).manager).toBeDefined();
      expect(result.manager_id).toBe('EMP_SUP001');
      expect((result as any).manager.first_name_en).toBe('Rungrote');
      expect((result as any).manager.last_name_en).toBe('Amnuaysopon');
    });

    it('should include job info (grade, level, position_id)', async () => {
      prisma.employee.findUnique.mockResolvedValue(structuredClone(mockEmployeeRecord));

      const result = await service.getEmployment('EMP001', mockEmployeeUser);

      expect(result.position_id).toBe('40128307');
      expect(result.grade).toBe('TL3');
      expect(result.level).toBe('Senior');
    });
  });

  describe('manageEmergencyContacts', () => {
    it('should list emergency contacts for employee', async () => {
      prisma.emergencyContact.findMany.mockResolvedValue(mockEmployeeRecord.emergency_contacts);

      const result = await service.listEmergencyContacts('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Yuki Tanaka');
      expect(result[0].relationship).toBe('spouse');
    });

    it('should create a new emergency contact', async () => {
      const newContact = {
        name: 'Jane Doe',
        relationship: 'sibling',
        phone: '+66 81 234 5678',
        is_primary: false,
      };
      const createdContact = { id: 'ec_003', employee_id: 'EMP001', ...newContact };
      prisma.emergencyContact.create.mockResolvedValue(createdContact);

      const result = await service.createEmergencyContact('EMP001', newContact, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('ec_003');
      expect(result.name).toBe('Jane Doe');
      expect(result.relationship).toBe('sibling');
    });

    it('should update an existing emergency contact', async () => {
      const updateData = { phone: '+66 82 999 8888' };
      prisma.emergencyContact.findUnique.mockResolvedValue(mockEmployeeRecord.emergency_contacts[0]);
      prisma.emergencyContact.update.mockResolvedValue({
        ...mockEmployeeRecord.emergency_contacts[0],
        phone: '+66 82 999 8888',
      });

      const result = await service.updateEmergencyContact('EMP001', 'ec_001', updateData, mockEmployeeUser);

      expect(result.phone).toBe('+66 82 999 8888');
    });

    it('should delete an emergency contact', async () => {
      prisma.emergencyContact.findUnique.mockResolvedValue(mockEmployeeRecord.emergency_contacts[0]);
      prisma.emergencyContact.delete.mockResolvedValue(mockEmployeeRecord.emergency_contacts[0]);

      await expect(
        service.deleteEmergencyContact('EMP001', 'ec_001', mockEmployeeUser),
      ).resolves.not.toThrow();

      expect(prisma.emergencyContact.delete).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'ec_001' } }),
      );
    });

    it('should allow employee to manage their own contacts', async () => {
      prisma.emergencyContact.findMany.mockResolvedValue(mockEmployeeRecord.emergency_contacts);

      const result = await service.listEmergencyContacts('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(prisma.emergencyContact.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { employee_id: 'EMP001' },
        }),
      );
    });

    it('should allow HR to manage any employee contacts', async () => {
      prisma.emergencyContact.findMany.mockResolvedValue(mockEmployeeRecord.emergency_contacts);

      const result = await service.listEmergencyContacts('EMP001', mockHrAdminUser);

      expect(result).toBeDefined();
    });
  });

  describe('manageDependents', () => {
    it('should list dependents for employee', async () => {
      prisma.dependent.findMany.mockResolvedValue(mockEmployeeRecord.dependents);

      const result = await service.listDependents('EMP001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Yuki Tanaka');
      expect(result[0].relationship_type).toBe('spouse');
    });

    it('should create a new dependent with relationship type', async () => {
      const newDependent = {
        name: 'Kai Tanaka',
        relationship_type: 'child',
        date_of_birth: '2023-01-15',
        gender: 'male',
      };
      const createdDependent = { id: 'dep_003', employee_id: 'EMP001', ...newDependent };
      prisma.dependent.create.mockResolvedValue(createdDependent);

      const result = await service.createDependent('EMP001', newDependent, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('dep_003');
      expect(result.name).toBe('Kai Tanaka');
      expect(result.relationship_type).toBe('child');
    });

    it('should update a dependent', async () => {
      const updateData = { name: 'Yuki Tanaka-Updated' };
      prisma.dependent.findUnique.mockResolvedValue(mockEmployeeRecord.dependents[0]);
      prisma.dependent.update.mockResolvedValue({
        ...mockEmployeeRecord.dependents[0],
        name: 'Yuki Tanaka-Updated',
      });

      const result = await service.updateDependent('EMP001', 'dep_001', updateData, mockEmployeeUser);

      expect(result.name).toBe('Yuki Tanaka-Updated');
    });

    it('should delete a dependent', async () => {
      prisma.dependent.findUnique.mockResolvedValue(mockEmployeeRecord.dependents[0]);
      prisma.dependent.delete.mockResolvedValue(mockEmployeeRecord.dependents[0]);

      await expect(
        service.deleteDependent('EMP001', 'dep_001', mockEmployeeUser),
      ).resolves.not.toThrow();

      expect(prisma.dependent.delete).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'dep_001' } }),
      );
    });
  });

  describe('getWorkPermits', () => {
    const mockWorkPermits = [
      {
        id: 'wp_001',
        employee_id: 'EMP001',
        permit_type: 'non_immigrant_b',
        permit_number: 'WP-2024-123456',
        issue_date: new Date('2024-01-15'),
        expiry_date: new Date('2026-03-20'),
        issuing_country: 'Thailand',
        status: 'active',
      },
    ];

    it('should return work permits for employee', async () => {
      prisma.workPermit.findMany.mockResolvedValue(mockWorkPermits);

      const result = await service.getWorkPermits('EMP001', mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].permit_number).toBe('WP-2024-123456');
      expect(result[0].permit_type).toBe('non_immigrant_b');
      expect(result[0].issue_date).toEqual(new Date('2024-01-15'));
      expect(result[0].expiry_date).toEqual(new Date('2026-03-20'));
      expect(result[0].issuing_country).toBe('Thailand');
    });

    it('should reject if caller is not HR admin/HR manager', async () => {
      await expect(
        service.getWorkPermits('EMP001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should include permit type, number, issue_date, expiry_date, issuing_country', async () => {
      prisma.workPermit.findMany.mockResolvedValue(mockWorkPermits);

      const result = await service.getWorkPermits('EMP001', mockHrManagerUser);

      expect(result[0]).toHaveProperty('permit_type');
      expect(result[0]).toHaveProperty('permit_number');
      expect(result[0]).toHaveProperty('issue_date');
      expect(result[0]).toHaveProperty('expiry_date');
      expect(result[0]).toHaveProperty('issuing_country');
    });
  });
});
