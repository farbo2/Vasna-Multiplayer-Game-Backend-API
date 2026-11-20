import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class createMoveDto {
  @IsNumber()
  matchId: number;

  @IsOptional()
  @IsNumber()
  playerId?: number;

  @IsString()
  moveType: string;

  @IsString()
  moveDate: string;

  @IsDate()
  timestamp: Date;
}
