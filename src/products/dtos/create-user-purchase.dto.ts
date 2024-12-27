import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class createUserPurchaseDto {
  @IsString()
  userId: number;

  @IsNumber()
  productId: number;

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

  @IsBoolean()
  status: boolean;
}
