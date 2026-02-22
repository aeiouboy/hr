import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { TalentService, calculateNineBoxPosition, NINE_BOX_GRID } from '../../src/talent/talent.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  talentProfile: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const employeeUser: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'],
};
const managerUser: CurrentUserInterface = {
  id: 'MGR001', email: 'mgr@cg.com', username: 'mgr', firstName: 'Mgr', lastName: 'User', roles: ['manager'],
};
const hrUser: CurrentUserInterface = {
  id: 'HR001', email: 'hr@cg.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'],
};

const mockProfile = {
  id: 'tp-1', employee_id: 'EMP001', performance_rating: 4.5, potential_rating: 4.0,
  nine_box_position: 'Star', risk_of_leaving: 'low', impact_of_leaving: 'high',
  career_aspiration: 'VP', mobility: 'open', key_strengths: ['leadership'],
  development_areas: ['strategic thinking'], last_calibration: new Date(),
  created_at: new Date(), updated_at: new Date(),
};

describe('TalentService', () => {
  let service: TalentService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<TalentService>(TalentService);
  });

  describe('calculateNineBoxPosition', () => {
    it('should return Star for high performance + high potential', () => {
      expect(calculateNineBoxPosition(5, 5)).toBe('Star');
      expect(calculateNineBoxPosition(4, 4)).toBe('Star');
    });

    it('should return High Performer for high performance + medium potential', () => {
      expect(calculateNineBoxPosition(4.5, 3)).toBe('High Performer');
    });

    it('should return Risk for low performance + low potential', () => {
      expect(calculateNineBoxPosition(1, 1)).toBe('Risk');
      expect(calculateNineBoxPosition(2, 2)).toBe('Risk');
    });

    it('should return Core Player for medium + medium', () => {
      expect(calculateNineBoxPosition(3, 3)).toBe('Core Player');
    });

    it('should map all 9 positions correctly', () => {
      expect(Object.keys(NINE_BOX_GRID)).toHaveLength(9);
    });
  });

  describe('getProfile', () => {
    it('should return talent profile for own employee', async () => {
      mockPrisma.talentProfile.findUnique.mockResolvedValue(structuredClone(mockProfile));
      const result = await service.getProfile('EMP001', employeeUser);
      expect(result.nine_box_position).toBe('Star');
    });

    it('should throw NotFoundException', async () => {
      mockPrisma.talentProfile.findUnique.mockResolvedValue(null);
      await expect(service.getProfile('EMP001', employeeUser)).rejects.toThrow(NotFoundException);
    });

    it('should reject employee accessing another profile', async () => {
      await expect(service.getProfile('EMP999', employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('createOrUpdateProfile', () => {
    it('should create new talent profile with 9-box calculation', async () => {
      mockPrisma.talentProfile.findUnique.mockResolvedValue(null);
      mockPrisma.talentProfile.create.mockResolvedValue({ ...mockProfile, nine_box_position: 'Star' });
      const result = await service.createOrUpdateProfile('EMP001', { performance_rating: 4.5, potential_rating: 4.0 }, managerUser);
      expect(result.nine_box_position).toBe('Star');
    });

    it('should update existing profile', async () => {
      mockPrisma.talentProfile.findUnique.mockResolvedValue(structuredClone(mockProfile));
      mockPrisma.talentProfile.update.mockResolvedValue({ ...mockProfile, risk_of_leaving: 'high' });
      const result = await service.createOrUpdateProfile('EMP001', { risk_of_leaving: 'high' }, hrUser);
      expect(result.risk_of_leaving).toBe('high');
    });

    it('should reject employee updating talent profile', async () => {
      await expect(service.createOrUpdateProfile('EMP001', {}, employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getNineBoxGrid', () => {
    it('should return grouped profiles by 9-box position', async () => {
      mockPrisma.talentProfile.findMany.mockResolvedValue([
        { ...mockProfile, nine_box_position: 'Star' },
        { ...mockProfile, id: 'tp-2', employee_id: 'EMP002', nine_box_position: 'Core Player' },
      ]);
      const result = await service.getNineBoxGrid(hrUser);
      expect(result.total).toBe(2);
      expect(result.grid['Star']).toHaveLength(1);
      expect(result.grid['Core Player']).toHaveLength(1);
    });

    it('should reject employee accessing 9-box grid', async () => {
      await expect(service.getNineBoxGrid(employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('identifyHiPo', () => {
    it('should return high-potential employees (Star, High Potential, High Performer)', async () => {
      mockPrisma.talentProfile.findMany.mockResolvedValue([structuredClone(mockProfile)]);
      const result = await service.identifyHiPo(hrUser);
      expect(result).toHaveLength(1);
    });

    it('should reject employee accessing hi-po list', async () => {
      await expect(service.identifyHiPo(employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });
});
