import { IsString, IsOptional, IsNumber, IsDateString, IsIn } from 'class-validator';

export class SubmitClaimDto {
  @IsString()
  plan_id: string;

  @IsString()
  @IsIn(['medical', 'dental', 'vision', 'wellness'])
  claim_type: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  receipt_date: string;
}
