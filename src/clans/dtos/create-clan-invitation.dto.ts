import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createClanInvitationDto {
  @IsNumber()
  clanId: number;

  @IsNumber()
  inviterId: number;

  @IsNumber()
  invitedId: number;
}
