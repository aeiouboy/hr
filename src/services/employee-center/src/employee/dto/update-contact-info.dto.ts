import { IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class UpdateContactInfoDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEmail()
  personal_email?: string;

  @IsOptional()
  @IsString()
  business_phone?: string;

  @IsOptional()
  @Matches(/^\+?\d[\d\s\-]+$/, { message: 'personal_mobile must be a valid phone number' })
  personal_mobile?: string;
}
