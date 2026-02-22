import { IsString, IsOptional } from 'class-validator';

export class ApproveStepDto {
  @IsString()
  @IsOptional()
  comments?: string;
}
