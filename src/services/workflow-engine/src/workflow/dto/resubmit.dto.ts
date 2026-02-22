import { IsObject, IsNotEmpty } from 'class-validator';

export class ResubmitDto {
  @IsObject()
  @IsNotEmpty()
  new_values: Record<string, any>;
}
