import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCampaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  campaignId: number;

  @Column()
  status: string;

  @Column()
  score: number;

  @Column()
  attempts: number;

  @Column()
  completedAt: Date;
}
