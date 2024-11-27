import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BattlePass } from './battle-pass.entity';

@Entity()
export class BattlePassLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelNumber: number;

  @Column()
  xpRequiredForComplete: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @ManyToOne(() => BattlePass, (battlePass) => battlePass.levels)
  battlePass: string;
}
