import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RejectClaimDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  reason: string;
}
