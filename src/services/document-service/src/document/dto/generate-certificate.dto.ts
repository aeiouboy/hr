import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GenerateCertificateDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsOptional()
  purpose?: string;
}
