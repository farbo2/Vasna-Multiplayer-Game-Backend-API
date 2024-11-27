import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Card } from './card.entity';
import { UserUnlockedCard } from './user-unlocked-card.entity';

@Entity()
export class UserSelectedCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => UserUnlockedCard)
  card: UserUnlockedCard;

  @Column()
  selectedAt: Date;
}
