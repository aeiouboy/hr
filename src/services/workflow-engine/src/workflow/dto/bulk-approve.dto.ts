import { IsArray, IsString, IsOptional, ArrayMinSize } from 'class-validator';

export class BulkApproveDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  workflow_ids: string[];

  @IsString()
  @IsOptional()
  comments?: string;
}
