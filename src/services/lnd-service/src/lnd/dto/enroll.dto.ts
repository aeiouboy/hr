import { IsString, IsNotEmpty } from 'class-validator';

export class EnrollDto {
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  employee_name: string;
}
