import { IsNumber, IsOptional, IsString } from 'class-validator';

export class getUserCampaignDto {
  @IsString()
  userId: number;
}
