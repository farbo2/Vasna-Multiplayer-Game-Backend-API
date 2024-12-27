import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateUserPurchaseDto {
  @IsString()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsBoolean()
  @IsOptional()
  hasDiscount?: boolean;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
