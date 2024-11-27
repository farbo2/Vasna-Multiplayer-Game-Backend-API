import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1Id: number;

  @Column()
  player2Id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  winnerId: number;

  @Column()
  matchType: string;

  @Column()
  status: string;
}
