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

  @Column()
  status: string;

  @Column()
  sentAt: Date;

  @Column()
  responsedAt: Date;
}
