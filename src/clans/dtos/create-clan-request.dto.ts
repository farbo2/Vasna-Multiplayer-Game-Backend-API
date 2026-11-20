import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createClanRequestDto {
  @IsNumber()
  clanId: number;

  @IsOptional()
  @IsNumber()
  playerId?: number;
}
