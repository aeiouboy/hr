import { IsString, IsNotEmpty, IsDateString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateDelegationDto {
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
  @ArrayMinSize(1)
  @IsString({ each: true })
  change_types: string[];
}
