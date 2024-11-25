import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClanQuestProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clan_id: number;

  @Column()
  quest_id: number;

  @Column()
  currentPoint: number;

  @Column()
  lastUpdated: Date;
}
