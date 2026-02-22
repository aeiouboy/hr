import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { TransferService } from '../../src/transfer/transfer.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  transfer: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  position: {
    findUnique: jest.fn(),
  },
  orgNode: {
    findUnique: jest.fn(),
  },
};

const mockHrAdminUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Manager',
  lastName: 'User',
  roles: ['manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'chongrak.t@centralgroup.com',
  username: 'chongrak.t',
  firstName: 'Chongrak',
  lastName: 'Tanaka',
  roles: ['employee'],
};

const mockTransfer = {
  id: 'TRF001',
  employee_id: 'EMP001',
  from_position_id: 'POS001',
  to_position_id: 'POS003',
  from_department_id: 'D001',
  to_department_id: 'D002',
  transfer_type: 'lateral',
  effective_date: new Date('2026-04-01'),
  status: 'pending',
  reason: 'Career development opportunity',
  requested_by: 'HR001',
  created_at: new Date('2026-02-15'),
};

describe('TransferService', () => {
  let service: TransferService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TransferService>(TransferService);
    prisma = mockPrismaService;
  });

  describe('create', () => {
    const createDto = {
      employee_id: 'EMP001',
      from_position_id: 'POS001',
      to_position_id: 'POS003',
      from_department_id: 'D001',
      to_department_id: 'D002',
      transfer_type: 'lateral',
      effective_date: '2026-04-01',
      reason: 'Career development opportunity',
    };

    it('should create a transfer request (HR or Manager)', async () => {
      prisma.transfer.create.mockResolvedValue({ ...mockTransfer, id: 'TRF_NEW' });

      const result = await service.create(createDto, mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('TRF_NEW');
      expect(result.status).toBe('pending');
    });

    it('should reject creation by regular employees', async () => {
      await expect(service.create(createDto, mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should set status to pending on creation', async () => {
      prisma.transfer.create.mockResolvedValue({ ...mockTransfer, status: 'pending' });

      const result = await service.create(createDto, mockHrAdminUser);

      expect(result.status).toBe('pending');
      expect(prisma.transfer.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: 'pending' }),
        }),
      );
    });

    it('should allow managers to create transfer requests', async () => {
      prisma.transfer.create.mockResolvedValue({ ...mockTransfer, requested_by: 'MGR001' });

      const result = await service.create(createDto, mockManagerUser);

      expect(result).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should return a transfer request by ID', async () => {
      prisma.transfer.findUnique.mockResolvedValue(mockTransfer);

      const result = await service.findById('TRF001');

      expect(result).toBeDefined();
      expect(result.id).toBe('TRF001');
      expect(result.employee_id).toBe('EMP001');
      expect(result.transfer_type).toBe('lateral');
    });

    it('should throw NotFoundException for non-existent transfer', async () => {
      prisma.transfer.findUnique.mockResolvedValue(null);

      await expect(service.findById('NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return paginated list of transfers', async () => {
      prisma.transfer.findMany.mockResolvedValue([mockTransfer]);
      prisma.transfer.count.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should filter transfers by status', async () => {
      prisma.transfer.findMany.mockResolvedValue([]);
      prisma.transfer.count.mockResolvedValue(0);

      await service.findAll({ status: 'approved', page: 1, limit: 10 });

      expect(prisma.transfer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'approved' }),
        }),
      );
    });

    it('should filter transfers by employee', async () => {
      prisma.transfer.findMany.mockResolvedValue([mockTransfer]);
      prisma.transfer.count.mockResolvedValue(1);

      await service.findAll({ employee_id: 'EMP001', page: 1, limit: 10 });

      expect(prisma.transfer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ employee_id: 'EMP001' }),
        }),
      );
    });
  });

  describe('approve', () => {
    it('should approve a pending transfer (HR only)', async () => {
      prisma.transfer.findUnique.mockResolvedValue(mockTransfer);
      prisma.transfer.update.mockResolvedValue({ ...mockTransfer, status: 'approved' });

      const result = await service.approve('TRF001', mockHrAdminUser);

      expect(result.status).toBe('approved');
    });

    it('should reject approval by non-HR users', async () => {
      await expect(service.approve('TRF001', mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw if transfer is not in pending status', async () => {
      prisma.transfer.findUnique.mockResolvedValue({ ...mockTransfer, status: 'approved' });

      await expect(service.approve('TRF001', mockHrAdminUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('reject', () => {
    it('should reject a pending transfer (HR only)', async () => {
      prisma.transfer.findUnique.mockResolvedValue(mockTransfer);
      prisma.transfer.update.mockResolvedValue({ ...mockTransfer, status: 'rejected' });

      const result = await service.reject('TRF001', 'Budget constraints', mockHrAdminUser);

      expect(result.status).toBe('rejected');
    });

    it('should reject by non-HR users', async () => {
      await expect(
        service.reject('TRF001', 'reason', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
