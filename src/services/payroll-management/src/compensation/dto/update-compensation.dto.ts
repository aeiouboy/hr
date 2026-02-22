import { IsOptional, IsNumber, IsString, IsDateString, Min, Max } from 'class-validator';

export class UpdateCompensationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  base_salary?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  position_allowance?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  housing_allowance?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  transportation_allowance?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  meal_allowance?: number;

  @IsOptional()
  @IsDateString()
  effective_date?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(15)
  provident_fund_rate?: number;
}
