import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createBattlePassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  sort: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
