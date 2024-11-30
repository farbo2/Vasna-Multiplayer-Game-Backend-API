import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BattlePassInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  battlePassId: number;

  @Column()
  levelId: number;

  @Column()
  rewardType: string;

  @Column()
  rewardAmount: number;

  @Column()
  redeemedAt: Date;
}
