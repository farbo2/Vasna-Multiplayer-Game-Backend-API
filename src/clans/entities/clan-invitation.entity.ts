import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ClanInvitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clanId: number;

  @Column()
  invitedPlayerId: number;

  @ManyToOne(() => User)
  inviter: User;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @Column()
  responsedAt: Date;
}
