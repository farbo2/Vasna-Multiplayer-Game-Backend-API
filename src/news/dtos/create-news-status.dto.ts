import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class createNewsStatusDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  newsId: number;

  @IsBoolean()
  isRead: boolean;

  @IsDate()
  ReadAt: Date;
}
