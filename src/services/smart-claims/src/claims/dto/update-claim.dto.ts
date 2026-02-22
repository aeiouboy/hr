import { IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class UpdateClaimDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsString()
  receipt_url?: string;

  @IsOptional()
  @IsString()
  receipt_date?: string;

  @IsOptional()
  @IsString()
  claim_type?: string;
}
