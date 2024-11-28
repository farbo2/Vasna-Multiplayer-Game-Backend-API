import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  targetPoint: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  isActive: boolean;
}
