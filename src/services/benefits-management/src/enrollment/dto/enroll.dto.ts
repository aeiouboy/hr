import { IsString, IsOptional, IsDateString, IsIn } from 'class-validator';

export class EnrollDto {
  @IsString()
  employee_id: string;

  @IsString()
  plan_id: string;

  @IsString()
  @IsIn(['individual', 'individual_spouse', 'family'])
  coverage_level: string;

  @IsDateString()
  effective_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
