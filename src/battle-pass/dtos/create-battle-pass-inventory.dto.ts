import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBattlePassInventoryDto {
  @IsNumber()
  battlePassId: number;

  @IsNumber()
  levelId: number;

  @IsString()
  @IsNotEmpty()
  rewardType: string;

  @IsNumber()
  rewardAmount: number;

  @IsDate()
  redeemedAt: Date;
}
