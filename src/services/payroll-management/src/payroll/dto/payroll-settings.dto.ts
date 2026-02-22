import { IsOptional, IsString, IsNumber, IsIn, Min, Max } from 'class-validator';

export class UpdatePayrollSettingsDto {
  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsIn(['monthly', 'bi-weekly', 'weekly'])
  pay_period?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(31)
  payment_day?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(31)
  cutoff_day?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  sso_rate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sso_max?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(15)
  pf_default_rate?: number;
}
