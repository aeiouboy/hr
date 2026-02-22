import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { maskNationalId, type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  private canAccessEmployee(employeeId: string, user: CurrentUserInterface): boolean {
    return this.isHr(user) || user.id === employeeId;
  }

  async findById(id: string, currentUser: CurrentUserInterface) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        employment: true,
        addresses: true,
        emergency_contacts: true,
        dependents: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Mask national_id for non-HR users
    if (!this.isHr(currentUser) && employee.national_id) {
      employee.national_id = maskNationalId(employee.national_id);
    }

    return employee;
  }

  async updatePersonalInfo(id: string, dto: any, currentUser: CurrentUserInterface) {
    // Only HR admin/manager can update personal info
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update personal info');
    }

    // Validate non-empty first_name_en if provided
    if (dto.first_name_en !== undefined && dto.first_name_en === '') {
      throw new BadRequestException('first_name_en must not be empty');
    }

    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const updated = await this.prisma.employee.update({
      where: { id },
      data: dto,
    });

    // Create audit log
    await this.prisma.auditLog.create({
      data: {
        employee_id: id,
        entity_type: 'employee',
        entity_id: id,
        action: 'update_personal_info',
        performed_by: currentUser.id,
        changes: dto,
      },
    });

    return updated;
  }

  async updateContactInfo(id: string, dto: any, currentUser: CurrentUserInterface) {
    // Employee can update own, HR can update any
    if (!this.canAccessEmployee(id, currentUser)) {
      throw new ForbiddenException("Cannot update another employee's contact info");
    }

    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const updated = await this.prisma.employee.update({
      where: { id },
      data: dto,
    });

    // Create audit log
    await this.prisma.auditLog.create({
      data: {
        employee_id: id,
        entity_type: 'employee',
        entity_id: id,
        action: 'update_contact_info',
        performed_by: currentUser.id,
        changes: dto,
      },
    });

    return updated;
  }

  async getEmployment(id: string, currentUser: CurrentUserInterface) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        employment: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee.employment;
  }

  async listEmergencyContacts(employeeId: string, currentUser: CurrentUserInterface) {
    return this.prisma.emergencyContact.findMany({
      where: { employee_id: employeeId },
    });
  }

  async createEmergencyContact(employeeId: string, dto: any, currentUser: CurrentUserInterface) {
    return this.prisma.emergencyContact.create({
      data: {
        employee_id: employeeId,
        ...dto,
      },
    });
  }

  async updateEmergencyContact(employeeId: string, contactId: string, dto: any, currentUser: CurrentUserInterface) {
    const contact = await this.prisma.emergencyContact.findUnique({ where: { id: contactId } });
    if (!contact) {
      throw new NotFoundException('Emergency contact not found');
    }

    return this.prisma.emergencyContact.update({
      where: { id: contactId },
      data: dto,
    });
  }

  async deleteEmergencyContact(employeeId: string, contactId: string, currentUser: CurrentUserInterface) {
    const contact = await this.prisma.emergencyContact.findUnique({ where: { id: contactId } });
    if (!contact) {
      throw new NotFoundException('Emergency contact not found');
    }

    return this.prisma.emergencyContact.delete({
      where: { id: contactId },
    });
  }

  async listDependents(employeeId: string, currentUser: CurrentUserInterface) {
    return this.prisma.dependent.findMany({
      where: { employee_id: employeeId },
    });
  }

  async createDependent(employeeId: string, dto: any, currentUser: CurrentUserInterface) {
    return this.prisma.dependent.create({
      data: {
        employee_id: employeeId,
        ...dto,
      },
    });
  }

  async updateDependent(employeeId: string, dependentId: string, dto: any, currentUser: CurrentUserInterface) {
    const dependent = await this.prisma.dependent.findUnique({ where: { id: dependentId } });
    if (!dependent) {
      throw new NotFoundException('Dependent not found');
    }

    return this.prisma.dependent.update({
      where: { id: dependentId },
      data: dto,
    });
  }

  async deleteDependent(employeeId: string, dependentId: string, currentUser: CurrentUserInterface) {
    const dependent = await this.prisma.dependent.findUnique({ where: { id: dependentId } });
    if (!dependent) {
      throw new NotFoundException('Dependent not found');
    }

    return this.prisma.dependent.delete({
      where: { id: dependentId },
    });
  }

  async getWorkPermits(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can view work permits');
    }

    return this.prisma.workPermit.findMany({
      where: { employee_id: employeeId },
    });
  }
}
