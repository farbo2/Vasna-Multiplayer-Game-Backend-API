import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClanQuestHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clan_id: number;

  @Column()
  quest_id: number;

  @Column()
  completedAt: Date;

  @Column()
  status: string;

  @Column()
  finalPoints: number;
}
