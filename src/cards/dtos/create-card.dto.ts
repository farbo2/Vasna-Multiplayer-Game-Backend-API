import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsString()
  requiredCurrency: string;

  @IsNumber()
  requiredCurrencyAmount: number;

  @IsNumber()
  rarity: number;

  @IsBoolean()
  isAvailable: boolean;
}
