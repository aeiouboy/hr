import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  position_code: string;

  @IsString()
  @IsNotEmpty()
  title_en: string;

  @IsOptional()
  @IsString()
  title_th?: string;

  @IsString()
  @IsNotEmpty()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  company_id: string;

  @IsOptional()
  @IsString()
  job_grade?: string;

  @IsOptional()
  @IsString()
  job_family?: string;

  @IsOptional()
  @IsString()
  cost_center?: string;

  @IsOptional()
  @IsString()
  reports_to_position_id?: string;

  @IsOptional()
  @IsInt()
  headcount?: number;

  @IsOptional()
  @IsInt()
  budget?: number;
}
