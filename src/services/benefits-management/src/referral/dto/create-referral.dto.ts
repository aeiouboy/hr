import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateReferralDto {
  @IsString()
  employee_id: string;

  @IsString()
  employee_name: string;

  @IsString()
  hospital_name: string;

  @IsOptional()
  @IsString()
  hospital_branch?: string;

  @IsString()
  reason: string;

  @IsDateString()
  preferred_date: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
