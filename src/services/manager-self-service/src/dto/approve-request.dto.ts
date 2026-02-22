import { IsString, IsOptional, IsArray, IsIn, ArrayMaxSize } from 'class-validator';

export class ApproveRejectDto {
  @IsIn(['approved', 'rejected'])
  action: 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  comment?: string;
}

export class BulkApproveRejectDto {
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  approval_ids: string[];

  @IsIn(['approved', 'rejected'])
  action: 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  comment?: string;
}
