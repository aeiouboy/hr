import { IsArray, IsString, IsOptional, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class BulkApproveDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsString({ each: true })
  ids: string[];

  @IsString()
  @IsOptional()
  reason?: string;
}
