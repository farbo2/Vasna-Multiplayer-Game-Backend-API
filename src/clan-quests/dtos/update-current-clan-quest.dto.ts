import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class updateCurrentClanQuestDto {
  @IsOptional()
  @IsNumber()
  currentPoint?: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isExpired?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  status?: string; //Processing-Successful-Failed

  @IsOptional()
  @IsDate()
  lastUpdated?: Date;
}
