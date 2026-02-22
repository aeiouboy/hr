import { IsOptional, IsString } from 'class-validator';

export class SubmitClaimDto {
  @IsOptional()
  @IsString()
  comments?: string;
}
