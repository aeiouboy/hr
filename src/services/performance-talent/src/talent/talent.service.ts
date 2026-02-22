import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

export const NINE_BOX_GRID: Record<string, { performance: string; potential: string; label: string }> = {
  'high_high': { performance: 'high', potential: 'high', label: 'Star' },
  'high_medium': { performance: 'high', potential: 'medium', label: 'High Performer' },
  'high_low': { performance: 'high', potential: 'low', label: 'Solid Performer' },
  'medium_high': { performance: 'medium', potential: 'high', label: 'High Potential' },
  'medium_medium': { performance: 'medium', potential: 'medium', label: 'Core Player' },
  'medium_low': { performance: 'medium', potential: 'low', label: 'Average Performer' },
  'low_high': { performance: 'low', potential: 'high', label: 'Inconsistent Player' },
  'low_medium': { performance: 'low', potential: 'medium', label: 'Underperformer' },
  'low_low': { performance: 'low', potential: 'low', label: 'Risk' },
};

export function calculateNineBoxPosition(performanceRating: number, potentialRating: number): string {
  const perfLevel = performanceRating >= 4 ? 'high' : performanceRating >= 3 ? 'medium' : 'low';
  const potLevel = potentialRating >= 4 ? 'high' : potentialRating >= 3 ? 'medium' : 'low';
  const key = `${perfLevel}_${potLevel}`;
  return NINE_BOX_GRID[key]?.label || 'Unclassified';
}

@Injectable()
export class TalentService {
  constructor(private readonly prisma: PrismaService) {}

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['manager', 'hr_admin', 'hr_manager'].includes(r));
  }

  async getProfile(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser) && employeeId !== currentUser.id) {
      throw new ForbiddenException('Cannot access talent profile');
    }
    const profile = await this.prisma.talentProfile.findUnique({ where: { employee_id: employeeId } });
    if (!profile) throw new NotFoundException('Talent profile not found');
    return profile;
  }

  async createOrUpdateProfile(employeeId: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can update talent profiles');
    }
    let nineBoxPosition = dto.nine_box_position;
    if (dto.performance_rating !== undefined && dto.potential_rating !== undefined) {
      nineBoxPosition = calculateNineBoxPosition(dto.performance_rating, dto.potential_rating);
    }
    const existing = await this.prisma.talentProfile.findUnique({ where: { employee_id: employeeId } });
    if (existing) {
      return this.prisma.talentProfile.update({
        where: { employee_id: employeeId },
        data: {
          performance_rating: dto.performance_rating ?? existing.performance_rating,
          potential_rating: dto.potential_rating ?? existing.potential_rating,
          nine_box_position: nineBoxPosition ?? existing.nine_box_position,
          risk_of_leaving: dto.risk_of_leaving ?? existing.risk_of_leaving,
          impact_of_leaving: dto.impact_of_leaving ?? existing.impact_of_leaving,
          career_aspiration: dto.career_aspiration ?? existing.career_aspiration,
          mobility: dto.mobility ?? existing.mobility,
          key_strengths: dto.key_strengths ?? existing.key_strengths,
          development_areas: dto.development_areas ?? existing.development_areas,
          last_calibration: dto.last_calibration ? new Date(dto.last_calibration) : existing.last_calibration,
        },
      });
    }
    return this.prisma.talentProfile.create({
      data: {
        employee_id: employeeId,
        performance_rating: dto.performance_rating,
        potential_rating: dto.potential_rating,
        nine_box_position: nineBoxPosition,
        risk_of_leaving: dto.risk_of_leaving,
        impact_of_leaving: dto.impact_of_leaving,
        career_aspiration: dto.career_aspiration,
        mobility: dto.mobility,
        key_strengths: dto.key_strengths,
        development_areas: dto.development_areas,
      },
    });
  }

  async getNineBoxGrid(currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can view the 9-box grid');
    }
    const profiles = await this.prisma.talentProfile.findMany({ where: { nine_box_position: { not: null } } });
    const grid: Record<string, any[]> = {};
    for (const p of profiles) {
      const pos = p.nine_box_position || 'Unclassified';
      if (!grid[pos]) grid[pos] = [];
      grid[pos].push(p);
    }
    return { grid, total: profiles.length };
  }

  async identifyHiPo(currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can identify high potentials');
    }
    return this.prisma.talentProfile.findMany({
      where: {
        OR: [
          { nine_box_position: 'Star' },
          { nine_box_position: 'High Potential' },
          { nine_box_position: 'High Performer' },
        ],
      },
      orderBy: { performance_rating: 'desc' },
    });
  }

  async getTalentPool(category: string | undefined, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can view talent pool');
    }
    const where: any = {};
    if (category) where.nine_box_position = category;
    return this.prisma.talentProfile.findMany({ where, orderBy: { updated_at: 'desc' } });
  }
}
