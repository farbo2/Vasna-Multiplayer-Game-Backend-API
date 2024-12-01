import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createUserCampaignDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  campaignId: number;

  @IsString()
  status: string;

  @IsNumber()
  score: number;

  @IsNumber()
  attempts: number;

  @IsDate()
  completedAt: Date;
}
