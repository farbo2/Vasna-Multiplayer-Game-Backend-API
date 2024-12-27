import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Clan } from './clan.entity';

@Entity()
export class ClanMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clan, (clan) => clan.members)
  clan: Clan;

  @Column()
  playerId: number;

  @Column({ default: 'normal' })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;
}
