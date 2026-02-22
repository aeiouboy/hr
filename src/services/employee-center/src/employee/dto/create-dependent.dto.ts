import { IsString, IsOptional, IsDateString, IsIn, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateDependentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['spouse', 'child', 'parent', 'sibling', 'other'])
  relationship_type: string;

  @IsDateString()
  date_of_birth: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  national_id?: string;

  @IsOptional()
  @IsBoolean()
  is_tax_deductible?: boolean;
}
