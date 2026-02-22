import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { CreateDependentDto } from './dto/create-dependent.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.findById(id, currentUser);
  }

  @Patch(':id/personal-info')
  async updatePersonalInfo(
    @Param('id') id: string,
    @Body() dto: UpdatePersonalInfoDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.updatePersonalInfo(id, dto, currentUser);
  }

  @Patch(':id/contact-info')
  async updateContactInfo(
    @Param('id') id: string,
    @Body() dto: UpdateContactInfoDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.updateContactInfo(id, dto, currentUser);
  }

  @Get(':id/employment')
  async getEmployment(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.getEmployment(id, currentUser);
  }

  @Get(':id/emergency-contacts')
  async listEmergencyContacts(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.listEmergencyContacts(id, currentUser);
  }

  @Post(':id/emergency-contacts')
  async createEmergencyContact(
    @Param('id') id: string,
    @Body() dto: CreateEmergencyContactDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.createEmergencyContact(id, dto, currentUser);
  }

  @Patch(':id/emergency-contacts/:contactId')
  async updateEmergencyContact(
    @Param('id') id: string,
    @Param('contactId') contactId: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.updateEmergencyContact(id, contactId, dto, currentUser);
  }

  @Delete(':id/emergency-contacts/:contactId')
  async deleteEmergencyContact(
    @Param('id') id: string,
    @Param('contactId') contactId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.deleteEmergencyContact(id, contactId, currentUser);
  }

  @Get(':id/dependents')
  async listDependents(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.listDependents(id, currentUser);
  }

  @Post(':id/dependents')
  async createDependent(
    @Param('id') id: string,
    @Body() dto: CreateDependentDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.createDependent(id, dto, currentUser);
  }

  @Patch(':id/dependents/:dependentId')
  async updateDependent(
    @Param('id') id: string,
    @Param('dependentId') dependentId: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.updateDependent(id, dependentId, dto, currentUser);
  }

  @Delete(':id/dependents/:dependentId')
  async deleteDependent(
    @Param('id') id: string,
    @Param('dependentId') dependentId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.deleteDependent(id, dependentId, currentUser);
  }

  @Get(':id/work-permits')
  async getWorkPermits(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.employeeService.getWorkPermits(id, currentUser);
  }
}
