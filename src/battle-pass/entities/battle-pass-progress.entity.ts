import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BattlePassProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  battlePassId: number;

  @Column({ type: 'int', default: 0 })
  currentLevel: number;

  @Column({ type: 'int', default: 0 })
  xpCollected: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}
