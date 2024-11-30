import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BattlePassLevel } from './battle-pass-level.entity';

@Entity()
export class BattlePass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  sort: number;

  @Column()
  status: string; //Expired-Progressing-InQueue

  @OneToMany(
    () => BattlePassLevel,
    (battlePassLevel) => battlePassLevel.battlePass,
    { cascade: true },
  )
  levels: BattlePassLevel[];
}
