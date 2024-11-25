import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class UserSelectedCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Card)
  card: Card;

  @Column()
  level: number;

  @Column()
  unlockedAt: number;
}
