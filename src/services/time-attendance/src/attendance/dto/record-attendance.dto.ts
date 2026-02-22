import { IsString, IsOptional, IsDateString, Matches } from 'class-validator';

export class RecordAttendanceDto {
  @IsString()
  employee_id: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  shift_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'actual_check_in must be in HH:MM format' })
  actual_check_in?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'actual_check_out must be in HH:MM format' })
  actual_check_out?: string;

  @IsOptional()
  @IsString()
  check_in_source?: string;

  @IsOptional()
  @IsString()
  check_in_location?: string;

  @IsOptional()
  @IsString()
  check_out_source?: string;

  @IsOptional()
  @IsString()
  check_out_location?: string;
}
