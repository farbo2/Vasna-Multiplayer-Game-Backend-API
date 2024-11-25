import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BattlePassLevel } from './battle-pass-level.entity';

@Entity()
export class BattlePass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  status: string;

  @OneToMany(
    () => BattlePassLevel,
    (battlePassLevel) => battlePassLevel.battlePass,
  )
  levels: BattlePassLevel[];
}
