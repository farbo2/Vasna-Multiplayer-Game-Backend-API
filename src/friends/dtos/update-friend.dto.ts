import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateFriendDto {
  @IsOptional()
  @IsNumber()
  playerId?: number;

  @IsOptional()
  @IsNumber()
  friendId?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
