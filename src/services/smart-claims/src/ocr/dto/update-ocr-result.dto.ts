import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateOcrResultDto {
  @IsOptional()
  @IsNumber()
  extracted_amount?: number;

  @IsOptional()
  @IsString()
  extracted_date?: string;

  @IsOptional()
  @IsString()
  extracted_merchant?: string;

  @IsOptional()
  @IsString()
  extracted_tax_id?: string;
}
