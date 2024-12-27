import { IsString } from 'class-validator';

export class createProductCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
