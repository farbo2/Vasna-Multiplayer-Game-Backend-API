import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBattlePassInventoryDto {
  @IsNumber()
  @IsOptional()
  battlePassId: number;

  @IsNumber()
  @IsOptional()
  levelId: number;

  @IsString()
  @IsOptional()
  rewardType: string;

  @IsNumber()
  @IsOptional()
  rewardAmount: number;

  @IsDate()
  @IsOptional()
  redeemedAt: Date;
}
