import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ClanQuest } from './clan-quest.entity';

@Entity()
export class CurrentClanQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clan_id: number;

  @ManyToOne(() => ClanQuest)
  clanQuest: ClanQuest;

  @Column()
  currentPoint: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  isExpired: boolean;

  @Column()
  isActive: boolean;

  @Column()
  status: string; //Processing-Successful-Failed

  @Column()
  lastUpdated: Date;
}
