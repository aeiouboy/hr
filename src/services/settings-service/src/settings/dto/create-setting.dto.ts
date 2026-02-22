import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_system?: boolean;
}
