import { Quest } from 'src/quests/entities/quest.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CurrentClanQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clan_id: string;

  @ManyToOne(() => Quest)
  quest: Quest;

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
