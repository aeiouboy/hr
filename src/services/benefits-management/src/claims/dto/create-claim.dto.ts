import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsIn(['medical', 'dental', 'travel', 'meals', 'office_supplies', 'training', 'other'])
  category: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
