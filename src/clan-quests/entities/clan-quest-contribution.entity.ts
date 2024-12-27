import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClanQuestContribution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clanId: number;

  @Column()
  questId: number;

  @Column()
  playerId: number;

  @Column({ type: 'int', default: 0 })
  contributionPoint: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}
