import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, Matches, Min } from 'class-validator';

export class CreateOvertimeRequestDto {
  @IsString()
  employee_id: string;

  @IsDateString()
  date: string;

  @IsString()
  day_type: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'start_time must be in HH:MM format' })
  start_time: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'end_time must be in HH:MM format' })
  end_time: string;

  @IsNumber()
  @Min(0)
  hours: number;

  @IsString()
  ot_type: string;

  @IsNumber()
  rate: number;

  @IsNumber()
  hourly_rate: number;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  work_description?: string;

  @IsOptional()
  @IsBoolean()
  pre_approved?: boolean;
}
