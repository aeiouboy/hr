import { IsString, IsNotEmpty, IsOptional, IsObject, IsDateString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  change_type: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsDateString()
  @IsNotEmpty()
  effective_date: string;

  @IsObject()
  @IsOptional()
  old_values?: Record<string, any>;

  @IsObject()
  @IsNotEmpty()
  new_values: Record<string, any>;

  @IsString()
  @IsOptional()
  description?: string;
}
