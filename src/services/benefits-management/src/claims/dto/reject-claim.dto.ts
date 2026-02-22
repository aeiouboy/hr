import { IsString } from 'class-validator';

export class RejectClaimDto {
  @IsString()
  reason: string;
}
