import { IsString, IsNotEmpty, IsDateString, IsOptional, IsArray } from 'class-validator';

export class DelegateDto {
  @IsString()
  @IsNotEmpty()
  delegate_id: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsArray()
  @IsOptional()
  workflow_types?: string[];
}
