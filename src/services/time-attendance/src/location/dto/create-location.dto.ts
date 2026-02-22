import { IsString, IsOptional, IsInt, IsObject, Min } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  location_code: string;

  @IsString()
  name_en: string;

  @IsOptional()
  @IsString()
  name_th?: string;

  @IsString()
  location_type: string;

  @IsOptional()
  @IsString()
  parent_location_id?: string;

  @IsOptional()
  @IsObject()
  address?: Record<string, any>;

  @IsOptional()
  @IsObject()
  coordinates?: Record<string, any>;

  @IsOptional()
  @IsInt()
  @Min(0)
  headcount?: number;
}
