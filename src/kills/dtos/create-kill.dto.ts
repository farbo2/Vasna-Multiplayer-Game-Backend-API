import { IsNumber, IsString } from 'class-validator';

export class createKillDto {
  @IsNumber()
  matchId: number;

  @IsNumber()
  playerId: number;

  @IsString()
  cardName: string;

  @IsString()
  cardType: string;

  @IsString()
  killType: string;
}
