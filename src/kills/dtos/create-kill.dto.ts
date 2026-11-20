import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createKillDto {
  @IsNumber()
  matchId: number;

  @IsOptional()
  @IsNumber()
  playerId?: number;

  @IsString()
  cardName: string;

  @IsString()
  cardType: string;

  @IsString()
  killType: string;
}
