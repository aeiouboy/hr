import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class ClaimFilterDto {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  @IsIn(['draft', 'submitted', 'processing', 'approved', 'rejected'])
  status?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}
