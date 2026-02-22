import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePolicyRuleDto {
  @IsNotEmpty()
  @IsString()
  rule_name: string;

  @IsNotEmpty()
  @IsString()
  claim_type: string;

  @IsNotEmpty()
  @IsNumber()
  max_amount: number;

  @IsNotEmpty()
  @IsNumber()
  max_amount_per_month: number;

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
  @IsNumber()
  min_days_notice?: number;

  @IsOptional()
  @IsString()
  effective_from?: string;

  @IsOptional()
  @IsString()
  effective_to?: string;

  @IsOptional()
  eligible_grades?: string[];
}
