import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ReassignWorkflowDto {
  @IsString()
  @IsNotEmpty()
  new_approver_id: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
