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

  @Column({ type: 'int', default: 0 })
  currentPoint: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  isExpired: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ default: 'Processing' })
  status: string; //Processing-Successful-Failed

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}
