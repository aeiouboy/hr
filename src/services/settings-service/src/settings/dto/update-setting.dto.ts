import { IsString, IsOptional } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  value?: any;

  @IsString()
  @IsOptional()
  description?: string;
}
