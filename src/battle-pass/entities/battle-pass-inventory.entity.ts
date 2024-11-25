import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BattlePassInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  battlePassId: string;

  @Column()
  levelId: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @Column()
  redeemedAt: Date;
}
