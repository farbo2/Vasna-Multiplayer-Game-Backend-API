import { IsDate, IsNumber, IsString } from 'class-validator';

export class createMoveDto {
  @IsNumber()
  matchId: number;

  @IsNumber()
  playerId: number;

  @IsString()
  moveType: string;

  @IsString()
  moveDate: string;

  @IsDate()
  timestamp: Date;
}
