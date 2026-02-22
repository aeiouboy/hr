import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get()
  async findAll(@Query('activeOnly') activeOnly?: string) {
    return this.shiftService.findAll(activeOnly !== 'false');
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.shiftService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: CreateShiftDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.shiftService.create(dto, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateShiftDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.shiftService.update(id, dto, currentUser);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.shiftService.delete(id, currentUser);
  }
}
