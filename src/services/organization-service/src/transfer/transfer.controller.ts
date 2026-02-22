import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  async findAll(
    @Query('employee_id') employeeId?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.transferService.findAll({
      employee_id: employeeId,
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.transferService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.transferService.create(dto, currentUser);
  }

  @Patch(':id/approve')
  async approve(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.transferService.approve(id, currentUser);
  }

  @Patch(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.transferService.reject(id, reason, currentUser);
  }
}
