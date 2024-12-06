import { IsBoolean, IsString } from 'class-validator';

export class createNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  imageUrl: string;

  @IsString()
  type: string;

  @IsBoolean()
  isActive: boolean;
}
