import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAll(
    @Query('department_id') departmentId?: string,
    @Query('company_id') companyId?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.positionService.findAll({
      department_id: departmentId,
      company_id: companyId,
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  @Get('departments')
  async getDepartments(@Query('company_id') companyId?: string) {
    return this.positionService.getDepartments(companyId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.positionService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.positionService.create(dto, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.positionService.update(id, dto, currentUser);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.positionService.delete(id, currentUser);
  }
}
