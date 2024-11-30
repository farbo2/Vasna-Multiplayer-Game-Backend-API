import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBattlePassLevelDto } from './create-battle-pass-level.dto';

export class AddBattlePassLevelsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBattlePassLevelDto)
  levels: CreateBattlePassLevelDto[];
}
