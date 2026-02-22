import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdatePolicyRuleDto {
  @IsOptional()
  @IsString()
  rule_name?: string;

  @IsOptional()
  @IsNumber()
  max_amount?: number;

  @IsOptional()
  @IsNumber()
  max_amount_per_month?: number;

  @IsOptional()
  @IsNumber()
  auto_approve_threshold?: number;

  @IsOptional()
  @IsBoolean()
  requires_receipt?: boolean;

  @IsOptional()
  @IsBoolean()
  requires_doctor_cert?: boolean;

  @IsOptional()
  @IsString()
  effective_to?: string;
}
