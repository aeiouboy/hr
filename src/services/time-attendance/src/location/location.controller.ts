import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll(
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    return this.locationService.findAll({ location_type: type, status });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.locationService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: CreateLocationDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.locationService.create(dto, currentUser);
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: string) {
    return this.locationService.getChildren(id);
  }

  @Get(':id/path')
  async getHierarchyPath(@Param('id') id: string) {
    return this.locationService.getHierarchyPath(id);
  }

  @Post('assign')
  async assignEmployee(
    @Body() body: { employee_id: string; location_id: string; location_type: string; effective_date: string },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.locationService.assignEmployee(body.employee_id, body.location_id, body.location_type, body.effective_date, currentUser);
  }

  @Get('employee/:employeeId')
  async getEmployeeLocations(@Param('employeeId') employeeId: string) {
    return this.locationService.getEmployeeLocations(employeeId);
  }
}
