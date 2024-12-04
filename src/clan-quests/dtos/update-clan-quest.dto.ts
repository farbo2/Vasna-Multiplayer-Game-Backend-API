import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateClanQuestDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  targetPoint?: number;

  @IsOptional()
  @IsString()
  rewardType?: string;

  @IsOptional()
  @IsNumber()
  rewardAmount?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  sort?: number;
}
