import { IsString, IsOptional, IsIn } from 'class-validator';
import { type ReportType } from '../government.service';

export class GenerateReportDto {
  @IsString()
  period: string;

  @IsString()
  @IsIn(['pnd1', 'pnd1_kor', 'sso', 'pvd'])
  report_type: ReportType;

  @IsOptional()
  @IsString()
  format?: string;
}
