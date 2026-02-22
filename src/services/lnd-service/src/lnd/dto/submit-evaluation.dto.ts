import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class SubmitEvaluationDto {
  @IsString()
  @IsNotEmpty()
  training_record_id: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  reaction_score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  learning_score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  behavior_score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  results_score?: number;
}
