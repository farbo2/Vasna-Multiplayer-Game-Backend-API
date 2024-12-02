import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createClanRequestDto {
  @IsNumber()
  clanId: number;

  @IsNumber()
  playerId: number;
}
