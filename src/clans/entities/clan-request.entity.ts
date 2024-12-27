import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ClanRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clanId: number;

  @ManyToOne(() => User)
  player: User;

  @Column({ default: 'Waiting' })
  status: string; //Waiting,Accepted,Declined

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @Column({ nullable: true })
  responsedAt: Date;
}
