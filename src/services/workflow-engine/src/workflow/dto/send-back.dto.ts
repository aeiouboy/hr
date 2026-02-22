import { IsString, IsNotEmpty } from 'class-validator';

export class SendBackDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}
