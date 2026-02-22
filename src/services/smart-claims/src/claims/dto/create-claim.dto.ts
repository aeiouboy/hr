import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn, Min } from 'class-validator';

export class CreateClaimDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['medical', 'travel', 'meal', 'equipment', 'other'])
  claim_type: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @IsString()
  receipt_date: string;

  @IsOptional()
  @IsString()
  receipt_url?: string;
}
