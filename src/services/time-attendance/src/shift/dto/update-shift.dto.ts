import { IsString, IsOptional, IsBoolean, IsInt, IsNumber, Min, Max, Matches } from 'class-validator';

export class UpdateShiftDto {
  @IsOptional()
  @IsString()
  name_en?: string;

  @IsOptional()
  @IsString()
  name_th?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'start_time must be in HH:MM format' })
  start_time?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'end_time must be in HH:MM format' })
  end_time?: string;

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

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
