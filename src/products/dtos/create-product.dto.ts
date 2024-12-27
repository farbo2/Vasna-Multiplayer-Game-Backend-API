import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class createProductDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;

  @IsBoolean()
  hasDiscount: boolean;

  @IsString()
  currency: string;

  @IsString()
  details: string;

  @IsBoolean()
  isAvailable: boolean;
}
