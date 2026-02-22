import { IsString, IsOptional, IsDateString, IsIn, IsNotEmpty } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsOptional()
  @IsString()
  from_position_id?: string;

  @IsOptional()
  @IsString()
  to_position_id?: string;

  @IsOptional()
  @IsString()
  from_department_id?: string;

  @IsOptional()
  @IsString()
  to_department_id?: string;

  @IsIn(['lateral', 'promotion', 'demotion', 'relocation'])
  transfer_type: string;

  @IsDateString()
  effective_date: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
