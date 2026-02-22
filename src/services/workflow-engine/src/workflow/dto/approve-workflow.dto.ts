import { IsString, IsOptional } from 'class-validator';

export class ApproveWorkflowDto {
  @IsString()
  @IsOptional()
  comments?: string;
}
