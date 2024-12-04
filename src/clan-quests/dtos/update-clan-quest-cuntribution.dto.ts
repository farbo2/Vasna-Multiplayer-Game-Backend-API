import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class updateClanQuestContributionDto {
  @IsOptional()
  @IsNumber()
  contributionPoint?: number;

  @IsOptional()
  @IsDate()
  lastUpdated?: Date;
}
