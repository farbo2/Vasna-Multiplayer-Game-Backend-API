import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateClanDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
