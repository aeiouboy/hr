import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findAll(filters?: { location_type?: string; status?: string }) {
    const where: any = {};
    if (filters?.location_type) where.location_type = filters.location_type;
    if (filters?.status) where.status = filters.status;
    return this.prisma.location.findMany({ where, orderBy: { name_en: 'asc' } });
  }

  async findById(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: { children: true, employee_locations: true },
    });
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async create(dto: CreateLocationDto, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create locations');
    }

    const existing = await this.prisma.location.findUnique({ where: { location_code: dto.location_code } });
    if (existing) {
      throw new ConflictException('Location code already exists');
    }

    return this.prisma.location.create({
      data: {
        location_code: dto.location_code,
        name_en: dto.name_en,
        name_th: dto.name_th,
        location_type: dto.location_type,
        parent_location_id: dto.parent_location_id,
        address: dto.address,
        coordinates: dto.coordinates,
        headcount: dto.headcount ?? 0,
      },
    });
  }

  async getChildren(parentId: string) {
    return this.prisma.location.findMany({
      where: { parent_location_id: parentId },
      orderBy: { name_en: 'asc' },
    });
  }

  async getHierarchyPath(locationId: string) {
    const path = [];
    let current = await this.prisma.location.findUnique({ where: { id: locationId } });
    while (current) {
      path.unshift(current);
      if (current.parent_location_id) {
        current = await this.prisma.location.findUnique({ where: { id: current.parent_location_id } });
      } else {
        break;
      }
    }
    return path;
  }

  async assignEmployee(employeeId: string, locationId: string, locationType: string, effectiveDate: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can assign employee locations');
    }

    const location = await this.prisma.location.findUnique({ where: { id: locationId } });
    if (!location) throw new NotFoundException('Location not found');

    return this.prisma.employeeLocation.create({
      data: {
        employee_id: employeeId,
        location_id: locationId,
        location_type: locationType,
        effective_date: new Date(effectiveDate),
      },
    });
  }

  async getEmployeeLocations(employeeId: string) {
    return this.prisma.employeeLocation.findMany({
      where: { employee_id: employeeId, status: 'active' },
      include: { location: true },
    });
  }
}
