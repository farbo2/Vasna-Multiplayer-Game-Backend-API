import { IsDate, IsNumber, IsString } from 'class-validator';

export class createFriendDto {
  @IsNumber()
  playerId: number;

  @IsNumber()
  friendId: number;

  @IsString()
  status: string;
}
