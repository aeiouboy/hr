import { IsString, IsOptional, IsBoolean, IsInt, IsNumber, Min, Max, Matches } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  code: string;

  @IsString()
  name_en: string;

  @IsOptional()
  @IsString()
  name_th?: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'start_time must be in HH:MM format' })
  start_time: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'end_time must be in HH:MM format' })
  end_time: string;

  @IsOptional()
  @IsBoolean()
  is_flexible?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  break_minutes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  work_hours?: number;
}
