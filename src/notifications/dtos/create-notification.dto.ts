import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class createNotificationDto {
  @IsNumber()
  playerId: number;

  @IsString()
  type: string;

  @IsNumber()
  relatedId: number;

  @IsString()
  content: string;

  @IsBoolean()
  isRead: boolean;
}
