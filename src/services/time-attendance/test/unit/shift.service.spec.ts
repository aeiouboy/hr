import { ShiftService } from '../../src/shift/shift.service';
import { ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';

const mockPrisma = {
  shift: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const hrUser = { id: 'user-1', email: 'hr@test.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'] };
const hrManager = { id: 'user-2', email: 'hrm@test.com', username: 'hrm', firstName: 'HR', lastName: 'Manager', roles: ['hr_manager'] };
const employee = { id: 'user-3', email: 'emp@test.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'] };

describe('ShiftService', () => {
  let service: ShiftService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ShiftService(mockPrisma as any);
  });

  describe('findAll', () => {
    it('should return active shifts by default', async () => {
      const shifts = [{ id: '1', code: 'DAY', is_active: true }];
      mockPrisma.shift.findMany.mockResolvedValue(shifts);

      const result = await service.findAll();
      expect(result).toEqual(shifts);
      expect(mockPrisma.shift.findMany).toHaveBeenCalledWith({ where: { is_active: true } });
    });

    it('should return all shifts when activeOnly is false', async () => {
      const shifts = [{ id: '1', code: 'DAY', is_active: true }, { id: '2', code: 'OFF', is_active: false }];
      mockPrisma.shift.findMany.mockResolvedValue(shifts);

      const result = await service.findAll(false);
      expect(result).toEqual(shifts);
      expect(mockPrisma.shift.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findById', () => {
    it('should return shift by id', async () => {
      const shift = { id: '1', code: 'DAY' };
      mockPrisma.shift.findUnique.mockResolvedValue(shift);

      const result = await service.findById('1');
      expect(result).toEqual(shift);
    });

    it('should throw NotFoundException if shift not found', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue(null);

      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const dto = { code: 'DAY', name_en: 'Day Shift', start_time: '08:00', end_time: '17:00' };

    it('should create a shift for HR user', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue(null);
      const expected = { id: '1', ...dto };
      mockPrisma.shift.create.mockResolvedValue(expected);

      const result = await service.create(dto, hrUser as any);
      expect(result).toEqual(expected);
    });

    it('should create a shift for HR manager', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue(null);
      const expected = { id: '1', ...dto };
      mockPrisma.shift.create.mockResolvedValue(expected);

      const result = await service.create(dto, hrManager as any);
      expect(result).toEqual(expected);
    });

    it('should reject non-HR users', async () => {
      await expect(service.create(dto, employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should reject duplicate shift code', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue({ id: '1', code: 'DAY' });

      await expect(service.create(dto, hrUser as any)).rejects.toThrow(ConflictException);
    });

    it('should use default values for optional fields', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue(null);
      mockPrisma.shift.create.mockResolvedValue({ id: '1' });

      await service.create(dto, hrUser as any);
      expect(mockPrisma.shift.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          is_flexible: false,
          break_minutes: 60,
          work_hours: 8,
        }),
      });
    });
  });

  describe('update', () => {
    it('should update a shift for HR user', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue({ id: '1', code: 'DAY' });
      mockPrisma.shift.update.mockResolvedValue({ id: '1', name_en: 'Updated' });

      const result = await service.update('1', { name_en: 'Updated' }, hrUser as any);
      expect(result.name_en).toBe('Updated');
    });

    it('should reject non-HR users', async () => {
      await expect(service.update('1', { name_en: 'Updated' }, employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if shift not found', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue(null);

      await expect(service.update('999', { name_en: 'Updated' }, hrUser as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should soft-delete a shift (set is_active to false)', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue({ id: '1', code: 'DAY' });
      mockPrisma.shift.update.mockResolvedValue({ id: '1', is_active: false });

      const result = await service.delete('1', hrUser as any);
      expect(result.is_active).toBe(false);
      expect(mockPrisma.shift.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { is_active: false },
      });
    });

    it('should reject non-HR users', async () => {
      await expect(service.delete('1', employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if shift not found', async () => {
      mockPrisma.shift.findUnique.mockResolvedValue(null);

      await expect(service.delete('999', hrUser as any)).rejects.toThrow(NotFoundException);
    });
  });
});
