import { IsOptional, IsDateString, IsIn } from 'class-validator';

export class TeamCalendarQueryDto {
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsIn(['leave', 'shift', 'all'])
  type?: string;
}

export class TeamCalendarEntryDto {
  id: string;
  employee_id: string;
  employee_name?: string;
  leave_type: string;
  start_date: Date;
  end_date: Date;
  status: string;
}
