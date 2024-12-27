import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { UserUnlockedCard } from './user-unlocked-card.entity';

@Entity()
export class UserSelectedCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => UserUnlockedCard)
  card: UserUnlockedCard;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  selectedAt: Date;
}
