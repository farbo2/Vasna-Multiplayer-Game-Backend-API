import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @ManyToOne(() => User)
  friend: User;

  @Column()
  status: string;

  @Column()
  requestedAt: Date;

  @Column()
  updatedAt: Date;
}
