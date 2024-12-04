import { IsNumber, IsString } from 'class-validator';

export class createClanQuestDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  targetPoint: number;

  @IsString()
  rewardType: string;

  @IsNumber()
  rewardAmount: number;

  @IsString()
  type: string;

  @IsNumber()
  sort: number;
}
