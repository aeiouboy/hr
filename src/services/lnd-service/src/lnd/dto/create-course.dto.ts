import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsIn,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  name_th: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsString()
  description_th?: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  delivery_method: string;

  @IsNumber()
  @Min(0.5)
  duration_hours: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level?: string;

  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_participants?: number;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name_en?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name_th?: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsString()
  description_th?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  delivery_method?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.5)
  duration_hours?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level?: string;

  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_participants?: number;

  @IsOptional()
  @IsIn(['active', 'inactive', 'archived'])
  status?: string;
}
