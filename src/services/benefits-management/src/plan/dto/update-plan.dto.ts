import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsIn } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  name_en?: string;

  @IsOptional()
  @IsString()
  name_th?: string;

  @IsOptional()
  @IsString()
  @IsIn(['health', 'dental', 'vision', 'life', 'retirement', 'welfare'])
  category?: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsString()
  description_th?: string;

  @IsOptional()
  @IsNumber()
  coverage_amount?: number;

  @IsOptional()
  @IsNumber()
  employer_contribution?: number;

  @IsOptional()
  @IsNumber()
  employee_contribution?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsDateString()
  effective_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
