import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateUserCampaignDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  campaignId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  attempts?: number;

  @IsOptional()
  @IsDate()
  completedAt?: Date;
}
