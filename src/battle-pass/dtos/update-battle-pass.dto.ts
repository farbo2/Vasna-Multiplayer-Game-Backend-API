import { IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateBattlePassDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  sort?: number;

  @IsOptional()
  @IsString()
  status?: string; // Expired-Progressing-InQueue
}
