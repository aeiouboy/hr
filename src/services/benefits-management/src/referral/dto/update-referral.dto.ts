import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateReferralDto {
  @IsOptional()
  @IsString()
  hospital_name?: string;

  @IsOptional()
  @IsString()
  hospital_branch?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsDateString()
  preferred_date?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
