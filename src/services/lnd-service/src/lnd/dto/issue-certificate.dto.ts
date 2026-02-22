import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class IssueCertificateDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsOptional()
  @IsString()
  training_record_id?: string;

  @IsString()
  @IsNotEmpty()
  certificate_number: string;

  @IsString()
  @IsNotEmpty()
  course_name: string;

  @IsDateString()
  @IsNotEmpty()
  issue_date: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsString()
  issuing_authority?: string;

  @IsOptional()
  @IsString()
  file_url?: string;
}
