import { IsOptional, IsString } from 'class-validator';

export class ApproveClaimDto {
  @IsOptional()
  @IsString()
  comments?: string;
}
