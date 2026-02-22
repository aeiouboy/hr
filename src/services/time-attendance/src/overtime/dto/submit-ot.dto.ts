import { IsString, IsOptional, IsDateString, IsNumber, IsBoolean, Matches, Min } from 'class-validator';

export class SubmitOtDto {
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
  @Min(0)
  hourly_rate: number;

  @IsOptional()
  @IsBoolean()
  has_night_premium?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  night_hours?: number;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  work_description?: string;

  @IsOptional()
  @IsBoolean()
  pre_approved?: boolean;
}
