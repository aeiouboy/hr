import { IsString, IsOptional, IsDateString, IsIn, IsNotEmpty } from 'class-validator';

export class UpdatePersonalInfoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name_en?: string;

  @IsOptional()
  @IsString()
  first_name_th?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name_en?: string;

  @IsOptional()
  @IsString()
  last_name_th?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  religion?: string;

  @IsOptional()
  @IsString()
  blood_type?: string;

  @IsOptional()
  @IsString()
  marital_status?: string;
}
