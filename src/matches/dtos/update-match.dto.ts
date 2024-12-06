import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateMatchDto {
  @IsOptional()
  @IsNumber()
  player1Id?: number;

  @IsOptional()
  @IsNumber()
  player2Id?: number;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;

  @IsOptional()
  @IsNumber()
  winnerId?: number;

  @IsOptional()
  @IsString()
  matchType?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
