import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreatePolicyRuleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsIn(['hard_limit', 'soft_warning', 'required_document', 'category_restriction'])
  rule_type: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  condition_field: string;

  @IsString()
  condition_value: string;
}

export class UpdatePolicyRuleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  condition_value?: string;

  @IsOptional()
  is_active?: boolean;
}
