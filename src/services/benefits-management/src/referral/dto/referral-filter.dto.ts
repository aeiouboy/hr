import { IsString, IsOptional, IsDateString, IsIn } from 'class-validator';

export class ReferralFilterDto {
  @IsOptional()
  @IsString()
  employee_id?: string;

  @IsOptional()
  @IsString()
  @IsIn(['draft', 'submitted', 'pending_manager', 'pending_hr', 'approved', 'rejected', 'cancelled', 'letter_issued'])
  status?: string;

  @IsOptional()
  @IsDateString()
  date_from?: string;

  @IsOptional()
  @IsDateString()
  date_to?: string;
}
