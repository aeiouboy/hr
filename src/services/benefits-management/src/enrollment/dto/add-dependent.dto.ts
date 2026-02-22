import { IsString, IsOptional, IsDateString, IsIn } from 'class-validator';

export class AddDependentDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['spouse', 'child', 'parent'])
  relationship: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsString()
  national_id?: string;
}
