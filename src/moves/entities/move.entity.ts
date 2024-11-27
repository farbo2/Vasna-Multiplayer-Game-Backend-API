import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Move {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  matchId: number;

  @Column()
  playerId: number;

  @Column()
  moveType: string;

  @Column()
  moveDate: string;

  @Column()
  timestamp: Date;
}
