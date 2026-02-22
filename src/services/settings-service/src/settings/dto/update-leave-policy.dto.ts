import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateLeavePolicyDto {
  @IsString()
  @IsOptional()
  leave_type_id?: string;

  @IsNumber()
  @IsOptional()
  days_per_year?: number;

  @IsNumber()
  @IsOptional()
  carry_forward_limit?: number;

  @IsBoolean()
  @IsOptional()
  requires_certificate?: boolean;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
