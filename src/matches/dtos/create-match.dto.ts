import { IsDate, IsNumber, IsString } from 'class-validator';

export class createMatchDto {
  @IsNumber()
  player1Id: number;

  @IsNumber()
  player2Id: number;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsNumber()
  winnerId: number;

  @IsString()
  matchType: string;

  @IsString()
  status: string;
}
