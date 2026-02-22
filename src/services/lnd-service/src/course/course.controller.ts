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
import { CourseService } from './course.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('mandatory') mandatory?: string,
    @Query('status') status?: string,
  ) {
    return this.courseService.findAll({
      category,
      level,
      mandatory: mandatory === 'true' ? true : mandatory === 'false' ? false : undefined,
      status,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.courseService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.courseService.create(dto, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.courseService.update(id, dto, currentUser);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.courseService.delete(id, currentUser);
  }
}
