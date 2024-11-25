import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClanQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clan_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  targetPoint: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @Column()
  type: string;
}
