import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class progressActiveBattlePass {
  @IsNumber()
  userId: number;

  @IsNumber()
  xpToAdd: number;
}
