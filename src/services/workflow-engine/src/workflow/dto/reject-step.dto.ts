import { IsString, IsNotEmpty } from 'class-validator';

export class RejectStepDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}
