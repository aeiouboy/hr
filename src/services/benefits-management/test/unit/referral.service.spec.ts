import { ReferralService } from '../../src/referral/referral.service';
import { NotFoundException, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';

const mockPrisma = {
  hospitalReferral: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn((fn: (tx: any) => Promise<any>) => fn(mockPrisma)),
};

const hrUser = { id: 'HR001', employee_id: 'EMP-HR001', roles: ['hr_admin'], name: 'HR Admin' };
const employeeUser = { id: 'EMP001', employee_id: 'EMP001', roles: ['employee'], name: 'John Doe' };
const managerUser = { id: 'MGR001', employee_id: 'MGR001', roles: ['manager'], name: 'Jane Manager', team_members: ['EMP001'] };
const otherEmployee = { id: 'EMP002', employee_id: 'EMP002', roles: ['employee'], name: 'Other Person' };

const mockReferral = {
  id: 'ref-1',
  employee_id: 'EMP001',
  employee_name: 'John Doe',
  hospital_name: 'Bangkok Hospital',
  hospital_branch: 'Headquarters',
  reason: 'Annual health checkup required',
  preferred_date: new Date('2026-03-15'),
  valid_from: null,
  valid_until: null,
  status: 'draft',
  workflow_id: null,
  referral_number: null,
  approved_by: null,
  approved_at: null,
  issued_by: null,
  issued_at: null,
  rejected_by: null,
  rejected_reason: null,
  notes: null,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('ReferralService', () => {
  let service: ReferralService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ReferralService(mockPrisma as any);
  });

  describe('create', () => {
    it('should create a referral in draft status', async () => {
      const dto = {
        employee_id: 'EMP001',
        employee_name: 'John Doe',
        hospital_name: 'Bangkok Hospital',
        hospital_branch: 'Headquarters',
        reason: 'Annual health checkup required',
        preferred_date: '2026-03-15',
        notes: null,
      };
      mockPrisma.hospitalReferral.create.mockResolvedValue({ ...mockReferral });
      const result = await service.create(dto as any, employeeUser as any);
      expect(result.status).toBe('draft');
      expect(mockPrisma.hospitalReferral.create).toHaveBeenCalled();
    });

    it('should pass correct data to prisma', async () => {
      const dto = {
        employee_id: 'EMP001',
        employee_name: 'John Doe',
        hospital_name: 'Bangkok Hospital',
        hospital_branch: 'Headquarters',
        reason: 'Annual health checkup required',
        preferred_date: '2026-03-15',
        notes: 'Some notes',
      };
      mockPrisma.hospitalReferral.create.mockResolvedValue({ ...mockReferral, notes: 'Some notes' });
      await service.create(dto as any, employeeUser as any);
      expect(mockPrisma.hospitalReferral.create).toHaveBeenCalledWith({
        data: {
          employee_id: 'EMP001',
          employee_name: 'John Doe',
          hospital_name: 'Bangkok Hospital',
          hospital_branch: 'Headquarters',
          reason: 'Annual health checkup required',
          preferred_date: new Date('2026-03-15'),
          notes: 'Some notes',
          status: 'draft',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all referrals without filters', async () => {
      mockPrisma.hospitalReferral.findMany.mockResolvedValue([mockReferral]);
      const result = await service.findAll();
      expect(result).toEqual([mockReferral]);
      expect(mockPrisma.hospitalReferral.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by employee_id', async () => {
      mockPrisma.hospitalReferral.findMany.mockResolvedValue([mockReferral]);
      await service.findAll({ employee_id: 'EMP001' });
      expect(mockPrisma.hospitalReferral.findMany).toHaveBeenCalledWith({
        where: { employee_id: 'EMP001' },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by status', async () => {
      mockPrisma.hospitalReferral.findMany.mockResolvedValue([]);
      await service.findAll({ status: 'pending_manager' });
      expect(mockPrisma.hospitalReferral.findMany).toHaveBeenCalledWith({
        where: { status: 'pending_manager' },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by date range', async () => {
      mockPrisma.hospitalReferral.findMany.mockResolvedValue([]);
      await service.findAll({ date_from: '2026-01-01', date_to: '2026-12-31' });
      expect(mockPrisma.hospitalReferral.findMany).toHaveBeenCalledWith({
        where: {
          created_at: {
            gte: new Date('2026-01-01'),
            lte: new Date('2026-12-31'),
          },
        },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by multiple criteria', async () => {
      mockPrisma.hospitalReferral.findMany.mockResolvedValue([mockReferral]);
      await service.findAll({ employee_id: 'EMP001', status: 'draft', date_from: '2026-01-01' });
      expect(mockPrisma.hospitalReferral.findMany).toHaveBeenCalledWith({
        where: {
          employee_id: 'EMP001',
          status: 'draft',
          created_at: { gte: new Date('2026-01-01') },
        },
        orderBy: { created_at: 'desc' },
      });
    });
  });

  describe('findById', () => {
    it('should return a referral by id', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue(mockReferral);
      const result = await service.findById('ref-1');
      expect(result).toEqual(mockReferral);
      expect(mockPrisma.hospitalReferral.findUnique).toHaveBeenCalledWith({ where: { id: 'ref-1' } });
    });

    it('should throw NotFoundException when not found', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue(null);
      await expect(service.findById('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('submit', () => {
    it('should change status from draft to pending_manager', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'draft' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      const result = await service.submit('ref-1', employeeUser as any);
      expect(result.status).toBe('pending_manager');
      expect(mockPrisma.hospitalReferral.update).toHaveBeenCalledWith({
        where: { id: 'ref-1' },
        data: { status: 'pending_manager' },
      });
    });

    it('should throw ConflictException if status is not draft', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      await expect(service.submit('ref-1', employeeUser as any)).rejects.toThrow(ConflictException);
    });

    it('should throw ForbiddenException if not the owner', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'draft' });
      await expect(service.submit('ref-1', otherEmployee as any)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('approve', () => {
    it('manager should approve: pending_manager → pending_hr', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'pending_hr', approved_by: 'MGR001' });
      const result = await service.approve('ref-1', managerUser as any);
      expect(result.status).toBe('pending_hr');
      expect(mockPrisma.hospitalReferral.update).toHaveBeenCalledWith({
        where: { id: 'ref-1' },
        data: expect.objectContaining({
          status: 'pending_hr',
          approved_by: 'MGR001',
        }),
      });
    });

    it('should throw ForbiddenException if non-manager tries to approve pending_manager', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      await expect(service.approve('ref-1', employeeUser as any)).rejects.toThrow(ForbiddenException);
    });

    it('hr should approve: pending_hr → approved', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_hr' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'approved', approved_by: 'HR001' });
      const result = await service.approve('ref-1', hrUser as any);
      expect(result.status).toBe('approved');
      expect(mockPrisma.hospitalReferral.update).toHaveBeenCalledWith({
        where: { id: 'ref-1' },
        data: expect.objectContaining({
          status: 'approved',
          approved_by: 'HR001',
        }),
      });
    });

    it('should throw ForbiddenException if non-hr tries to approve pending_hr', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_hr' });
      await expect(service.approve('ref-1', managerUser as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException if status is not pending_manager or pending_hr', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'draft' });
      await expect(service.approve('ref-1', managerUser as any)).rejects.toThrow(ConflictException);
    });

    it('should set approved_by and approved_at', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'pending_hr', approved_by: 'MGR001', approved_at: new Date() });
      await service.approve('ref-1', managerUser as any);
      const updateCall = mockPrisma.hospitalReferral.update.mock.calls[0][0];
      expect(updateCall.data.approved_by).toBe('MGR001');
      expect(updateCall.data.approved_at).toBeInstanceOf(Date);
    });
  });

  describe('reject', () => {
    it('should reject a pending_manager referral', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'rejected', rejected_by: 'MGR001', rejected_reason: 'Not approved' });
      const result = await service.reject('ref-1', 'Not approved', managerUser as any);
      expect(result.status).toBe('rejected');
      expect(mockPrisma.hospitalReferral.update).toHaveBeenCalledWith({
        where: { id: 'ref-1' },
        data: {
          status: 'rejected',
          rejected_by: 'MGR001',
          rejected_reason: 'Not approved',
        },
      });
    });

    it('should reject a pending_hr referral', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_hr' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'rejected', rejected_by: 'HR001', rejected_reason: 'Incomplete docs' });
      const result = await service.reject('ref-1', 'Incomplete docs', hrUser as any);
      expect(result.status).toBe('rejected');
    });

    it('should throw BadRequestException if no reason provided', async () => {
      await expect(service.reject('ref-1', '', managerUser as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if status is not pending', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'draft' });
      await expect(service.reject('ref-1', 'Some reason', managerUser as any)).rejects.toThrow(ConflictException);
    });

    it('should set rejected_by and rejected_reason', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'rejected' });
      await service.reject('ref-1', 'Not valid', managerUser as any);
      const updateCall = mockPrisma.hospitalReferral.update.mock.calls[0][0];
      expect(updateCall.data.rejected_by).toBe('MGR001');
      expect(updateCall.data.rejected_reason).toBe('Not valid');
    });
  });

  describe('issue', () => {
    it('should issue letter for approved referral', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'approved' });
      mockPrisma.hospitalReferral.count.mockResolvedValue(0);
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'letter_issued', referral_number: 'REF-2026-0001' });
      const result = await service.issue('ref-1', hrUser as any);
      expect(result.status).toBe('letter_issued');
    });

    it('should generate referral_number in REF-YYYY-NNNN format', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'approved' });
      mockPrisma.hospitalReferral.count.mockResolvedValue(5);
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'letter_issued', referral_number: 'REF-2026-0006' });
      await service.issue('ref-1', hrUser as any);
      const updateCall = mockPrisma.hospitalReferral.update.mock.calls[0][0];
      const year = new Date().getFullYear();
      expect(updateCall.data.referral_number).toMatch(new RegExp(`^REF-${year}-\\d{4}$`));
      expect(updateCall.data.referral_number).toBe(`REF-${year}-0006`);
    });

    it('should set valid_from and valid_until (30 days)', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'approved' });
      mockPrisma.hospitalReferral.count.mockResolvedValue(0);
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'letter_issued' });
      await service.issue('ref-1', hrUser as any);
      const updateCall = mockPrisma.hospitalReferral.update.mock.calls[0][0];
      expect(updateCall.data.valid_from).toBeInstanceOf(Date);
      expect(updateCall.data.valid_until).toBeInstanceOf(Date);
      const diffDays = Math.round(
        (updateCall.data.valid_until.getTime() - updateCall.data.valid_from.getTime()) / (1000 * 60 * 60 * 24)
      );
      expect(diffDays).toBe(30);
    });

    it('should throw ForbiddenException if not HR', async () => {
      await expect(service.issue('ref-1', employeeUser as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException if status is not approved', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_hr' });
      await expect(service.issue('ref-1', hrUser as any)).rejects.toThrow(ConflictException);
    });

    it('should set issued_by and issued_at', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'approved' });
      mockPrisma.hospitalReferral.count.mockResolvedValue(0);
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'letter_issued' });
      await service.issue('ref-1', hrUser as any);
      const updateCall = mockPrisma.hospitalReferral.update.mock.calls[0][0];
      expect(updateCall.data.issued_by).toBe('HR001');
      expect(updateCall.data.issued_at).toBeInstanceOf(Date);
    });
  });

  describe('cancel', () => {
    it('should cancel a draft referral', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'draft' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'cancelled' });
      const result = await service.cancel('ref-1', employeeUser as any);
      expect(result.status).toBe('cancelled');
      expect(mockPrisma.hospitalReferral.update).toHaveBeenCalledWith({
        where: { id: 'ref-1' },
        data: { status: 'cancelled' },
      });
    });

    it('should cancel a pending_manager referral', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'pending_manager' });
      mockPrisma.hospitalReferral.update.mockResolvedValue({ ...mockReferral, status: 'cancelled' });
      const result = await service.cancel('ref-1', employeeUser as any);
      expect(result.status).toBe('cancelled');
    });

    it('should throw ForbiddenException if not the owner', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'draft' });
      await expect(service.cancel('ref-1', otherEmployee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException if already approved/issued', async () => {
      mockPrisma.hospitalReferral.findUnique.mockResolvedValue({ ...mockReferral, status: 'approved' });
      await expect(service.cancel('ref-1', employeeUser as any)).rejects.toThrow(ConflictException);
    });
  });
});
