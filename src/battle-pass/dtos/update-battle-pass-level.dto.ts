import { IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';
export class UpdateBattlePassLevelDto {
  @IsOptional()
  @IsNumber()
  levelNumber?: number;

  @IsOptional()
  @IsNumber()
  xpRequiredForComplete?: number;
}
