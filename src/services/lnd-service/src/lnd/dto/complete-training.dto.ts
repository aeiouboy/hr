import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
  Max,
} from 'class-validator';

export class CompleteTrainingDto {
  @IsString()
  @IsNotEmpty()
  enrollment_id: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  course_code: string;

  @IsString()
  @IsNotEmpty()
  course_name_en: string;

  @IsOptional()
  @IsString()
  course_name_th?: string;

  @IsString()
  @IsNotEmpty()
  training_type: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  instructor_name?: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsNumber()
  @Min(0.5)
  duration_hours: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  pre_assessment_score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  post_assessment_score?: number;

  @IsOptional()
  @IsString()
  feedback?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  paid_by?: string;
}
