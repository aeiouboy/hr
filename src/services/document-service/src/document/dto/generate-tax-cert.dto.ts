import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateTaxCertDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  tax_year: string; // e.g. "2024"
}
