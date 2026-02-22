import { IsString, IsNotEmpty, IsDateString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateQuickDelegationDto {
  @IsString()
  @IsNotEmpty()
  delegate_to: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  workflow_types: string[];
}
