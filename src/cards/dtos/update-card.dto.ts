import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateCardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  requiredCurrency?: string;

  @IsOptional()
  @IsNumber()
  requiredCurrencyAmount?: number;

  @IsOptional()
  @IsNumber()
  rarity?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
