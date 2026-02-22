import { IsString, IsNotEmpty } from 'class-validator';

export class GeneratePayslipDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  period: string; // e.g. "2024-01"
}
