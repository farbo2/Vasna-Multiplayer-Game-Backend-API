import { IsInt, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateBattlePassLevelDto {
  @IsInt()
  levelNumber: number;

  @IsNumber()
  xpRequiredForComplete: number;
}
