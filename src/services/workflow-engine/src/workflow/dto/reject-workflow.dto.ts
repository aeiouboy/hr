import { IsString, IsNotEmpty } from 'class-validator';

export class RejectWorkflowDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsOptional()
  comments?: string;
}

import { IsOptional } from 'class-validator';
