import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  matchId: number;

  @Column()
  playerId: number;

  @Column()
  cardName: string;

  @Column()
  cardType: string;

  @Column()
  killType: string;

  @Column()
  killedAt: Date;
}
