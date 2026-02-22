import { IsString, IsOptional, Matches } from 'class-validator';

export class CreatePayrollRunDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'Period must be in YYYY-MM format' })
  period: string;

  @IsOptional()
  @IsString()
  type?: string;
}
