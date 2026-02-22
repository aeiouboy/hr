import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('is_active') isActive?: string,
  ) {
    const filters: any = {};
    if (category) filters.category = category;
    if (isActive !== undefined) filters.is_active = isActive === 'true';
    return this.planService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.planService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: CreatePlanDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.planService.create(dto, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePlanDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.planService.update(id, dto, currentUser);
  }

  @Delete(':id')
  async deactivate(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.planService.deactivate(id, currentUser);
  }
}
