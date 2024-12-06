import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class updateNewsStatusDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  newsId?: number;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsDate()
  ReadAt?: Date;
}
