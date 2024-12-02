import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createClanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  logo: string;

  @IsNumber()
  leaderId: number;
}
