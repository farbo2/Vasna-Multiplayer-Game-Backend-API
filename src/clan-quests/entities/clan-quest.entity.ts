import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClanQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  targetPoint: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @Column()
  type: string;

  @Column()
  sort: number;
}
