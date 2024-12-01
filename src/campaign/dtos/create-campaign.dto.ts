import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  difficulty: number;

  @IsString()
  rewardType: string;

  @IsNumber()
  rewardAmount: number;

  @IsNumber()
  sort: number;
}
