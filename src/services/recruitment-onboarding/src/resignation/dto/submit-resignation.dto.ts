import { IsString, IsOptional, IsDateString, IsNotEmpty, IsIn } from 'class-validator';

export class SubmitResignationDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  employee_name: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsDateString()
  last_working_date: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['voluntary', 'involuntary', 'retirement', 'contract_end', 'mutual_agreement', 'health_reasons', 'relocation', 'career_change', 'other'])
  reason_type: string;

  @IsOptional()
  @IsString()
  reason_detail?: string;

  @IsOptional()
  @IsString()
  manager_id?: string;
}
