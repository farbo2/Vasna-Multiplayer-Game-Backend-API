import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1Id: number;

  @Column()
  player2Id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  winnerId: number;

  @Column()
  matchType: string;

  @Column({ default: 'Waiting' })
  status: string;
}
