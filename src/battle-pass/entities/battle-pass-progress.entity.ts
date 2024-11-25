import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BattlePassProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  battlePassId: number;

  @Column()
  currentLevel: number;

  @Column()
  xpCollected: number;

  @Column()
  lastUpdated: Date;
}
