import { LocationService } from '../../src/location/location.service';
import { ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';

const mockPrisma = {
  location: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  employeeLocation: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

const hrUser = { id: 'user-1', email: 'hr@test.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'] };
const employee = { id: 'user-3', email: 'emp@test.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'] };

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new LocationService(mockPrisma as any);
  });

  describe('findAll', () => {
    it('should return all locations', async () => {
      const locations = [{ id: '1', name_en: 'HQ' }];
      mockPrisma.location.findMany.mockResolvedValue(locations);

      const result = await service.findAll();
      expect(result).toEqual(locations);
    });

    it('should filter by location_type', async () => {
      mockPrisma.location.findMany.mockResolvedValue([]);

      await service.findAll({ location_type: 'branch' });
      expect(mockPrisma.location.findMany).toHaveBeenCalledWith({
        where: { location_type: 'branch' },
        orderBy: { name_en: 'asc' },
      });
    });
  });

  describe('findById', () => {
    it('should return location with children', async () => {
      const location = { id: '1', name_en: 'HQ', children: [] as any[], employee_locations: [] as any[] };
      mockPrisma.location.findUnique.mockResolvedValue(location);

      const result = await service.findById('1');
      expect(result).toEqual(location);
    });

    it('should throw NotFoundException if not found', async () => {
      mockPrisma.location.findUnique.mockResolvedValue(null);
      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const dto = { location_code: 'BR-NEW', name_en: 'New Branch', location_type: 'branch' };

    it('should create a location for HR user', async () => {
      mockPrisma.location.findUnique.mockResolvedValue(null);
      mockPrisma.location.create.mockResolvedValue({ id: '1', ...dto });

      const result = await service.create(dto, hrUser as any);
      expect(result.location_code).toBe('BR-NEW');
    });

    it('should reject non-HR users', async () => {
      await expect(service.create(dto, employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should reject duplicate location code', async () => {
      mockPrisma.location.findUnique.mockResolvedValue({ id: '1', location_code: 'BR-NEW' });
      await expect(service.create(dto, hrUser as any)).rejects.toThrow(ConflictException);
    });
  });

  describe('getChildren', () => {
    it('should return child locations', async () => {
      const children = [{ id: '2', parent_location_id: '1' }];
      mockPrisma.location.findMany.mockResolvedValue(children);

      const result = await service.getChildren('1');
      expect(result).toEqual(children);
    });
  });

  describe('getHierarchyPath', () => {
    it('should return path from root to location', async () => {
      mockPrisma.location.findUnique
        .mockResolvedValueOnce({ id: '3', name_en: 'Floor 25', parent_location_id: '2' })
        .mockResolvedValueOnce({ id: '2', name_en: 'Silom Tower', parent_location_id: '1' })
        .mockResolvedValueOnce({ id: '1', name_en: 'Corporate Zone', parent_location_id: null });

      const result = await service.getHierarchyPath('3');
      expect(result).toHaveLength(3);
      expect(result[0].name_en).toBe('Corporate Zone');
      expect(result[2].name_en).toBe('Floor 25');
    });
  });

  describe('assignEmployee', () => {
    it('should assign employee to location for HR user', async () => {
      mockPrisma.location.findUnique.mockResolvedValue({ id: 'loc-1', name_en: 'HQ' });
      mockPrisma.employeeLocation.create.mockResolvedValue({
        id: 'el-1',
        employee_id: 'EMP001',
        location_id: 'loc-1',
        location_type: 'primary',
      });

      const result = await service.assignEmployee('EMP001', 'loc-1', 'primary', '2026-01-01', hrUser as any);
      expect(result.employee_id).toBe('EMP001');
      expect(result.location_id).toBe('loc-1');
    });

    it('should reject non-HR users', async () => {
      await expect(service.assignEmployee('EMP001', 'loc-1', 'primary', '2026-01-01', employee as any))
        .rejects.toThrow(ForbiddenException);
    });

    it('should throw if location not found', async () => {
      mockPrisma.location.findUnique.mockResolvedValue(null);
      await expect(service.assignEmployee('EMP001', 'loc-999', 'primary', '2026-01-01', hrUser as any))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('getEmployeeLocations', () => {
    it('should return active employee locations', async () => {
      const locations = [{ id: 'el-1', location: { name_en: 'HQ' } }];
      mockPrisma.employeeLocation.findMany.mockResolvedValue(locations);

      const result = await service.getEmployeeLocations('EMP001');
      expect(result).toEqual(locations);
      expect(mockPrisma.employeeLocation.findMany).toHaveBeenCalledWith({
        where: { employee_id: 'EMP001', status: 'active' },
        include: { location: true },
      });
    });
  });
});
