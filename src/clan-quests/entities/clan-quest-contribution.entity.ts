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

  @Column()
  contributionPoint: number;

  @Column()
  lastUpdated: Date;
}
