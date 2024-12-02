import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ClanQuest } from './clan-quest.entity';

@Entity()
export class CurrentClanQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clan_id: string;

  @ManyToOne(() => ClanQuest)
  quest: ClanQuest;

  @Column()
  currentPoint: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: number;

  @Column()
  isExpired: boolean;

  @Column()
  isActive: boolean;

  @Column()
  status: string; //Processing-Successful-Failed

  @Column()
  lastUpdated: Date;
}
