import { IsString, IsOptional, IsInt, IsIn } from 'class-validator';

export class UpdatePositionDto {
  @IsOptional()
  @IsString()
  title_en?: string;

  @IsOptional()
  @IsString()
  title_th?: string;

  @IsOptional()
  @IsString()
  department_id?: string;

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
  @IsIn(['active', 'vacant', 'frozen', 'inactive'])
  status?: string;

  @IsOptional()
  @IsInt()
  headcount?: number;

  @IsOptional()
  @IsInt()
  budget?: number;
}
