import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsString()
  @IsNotEmpty()
  leave_type_id: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsNumber()
  @Min(0.5)
  days: number;

  @IsOptional()
  @IsString()
  half_day?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  substitute_id?: string;
}
