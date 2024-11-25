import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BattlePass } from './battle-pass.entity';
import { BattlePassInventory } from './battle-pass-inventory.entity';

@Entity()
export class BattlePassLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelNumber: number;

  @Column()
  xpRequired: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @ManyToOne(() => BattlePass, (battlePass) => battlePass.levels)
  battlePass: string;
}
