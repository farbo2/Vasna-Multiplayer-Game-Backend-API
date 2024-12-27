import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  requiredCurrency: string;

  @Column()
  requiredCurrencyAmount: number;

  @Column()
  rarity: number;

  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;
}
