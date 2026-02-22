import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { EnrollDto } from './dto/enroll.dto';
import { AddDependentDto } from './dto/add-dependent.dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async enroll(dto: EnrollDto, currentUser: CurrentUserInterface) {
    // Only HR can enroll on behalf of others
    if (!this.isHr(currentUser) && currentUser.id !== dto.employee_id) {
      throw new ForbiddenException('You can only enroll yourself');
    }

    // Check plan exists and is active
    const plan = await this.prisma.benefitPlan.findUnique({ where: { id: dto.plan_id } });
    if (!plan) {
      throw new NotFoundException('Benefit plan not found');
    }
    if (!plan.is_active) {
      throw new ForbiddenException('Cannot enroll in an inactive plan');
    }

    // Check for duplicate enrollment
    const existing = await this.prisma.benefitEnrollment.findUnique({
      where: { employee_id_plan_id: { employee_id: dto.employee_id, plan_id: dto.plan_id } },
    });
    if (existing) {
      throw new ConflictException('Employee is already enrolled in this plan');
    }

    return this.prisma.benefitEnrollment.create({
      data: {
        employee_id: dto.employee_id,
        plan_id: dto.plan_id,
        coverage_level: dto.coverage_level,
        effective_date: new Date(dto.effective_date),
        end_date: dto.end_date ? new Date(dto.end_date) : undefined,
      },
      include: { plan: true },
    });
  }

  async getByEmployee(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser) && currentUser.id !== employeeId) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.benefitEnrollment.findMany({
      where: { employee_id: employeeId },
      include: { plan: true, dependents: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async cancel(enrollmentId: string, reason: string, currentUser: CurrentUserInterface) {
    const enrollment = await this.prisma.benefitEnrollment.findUnique({
      where: { id: enrollmentId },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    if (!this.isHr(currentUser) && currentUser.id !== enrollment.employee_id) {
      throw new ForbiddenException('Access denied');
    }
    if (enrollment.status === 'cancelled') {
      throw new ConflictException('Enrollment is already cancelled');
    }
    return this.prisma.benefitEnrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'cancelled',
        cancelled_at: new Date(),
        cancellation_reason: reason,
      },
    });
  }

  async addDependent(enrollmentId: string, dto: AddDependentDto, currentUser: CurrentUserInterface) {
    const enrollment = await this.prisma.benefitEnrollment.findUnique({
      where: { id: enrollmentId },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    if (!this.isHr(currentUser) && currentUser.id !== enrollment.employee_id) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.benefitDependent.create({
      data: {
        enrollment_id: enrollmentId,
        name: dto.name,
        relationship: dto.relationship,
        date_of_birth: dto.date_of_birth ? new Date(dto.date_of_birth) : undefined,
        national_id: dto.national_id,
      },
    });
  }

  async removeDependent(dependentId: string, currentUser: CurrentUserInterface) {
    const dependent = await this.prisma.benefitDependent.findUnique({
      where: { id: dependentId },
      include: { enrollment: true },
    });
    if (!dependent) {
      throw new NotFoundException('Dependent not found');
    }
    if (!this.isHr(currentUser) && currentUser.id !== dependent.enrollment.employee_id) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.benefitDependent.update({
      where: { id: dependentId },
      data: { is_active: false },
    });
  }

  async getDependents(enrollmentId: string) {
    const enrollment = await this.prisma.benefitEnrollment.findUnique({
      where: { id: enrollmentId },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    return this.prisma.benefitDependent.findMany({
      where: { enrollment_id: enrollmentId, is_active: true },
    });
  }
}
