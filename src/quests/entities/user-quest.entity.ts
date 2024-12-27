import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  questId: number;

  @Column({ default: 'Processing' })
  status: string;

  @Column()
  currentPoint: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}
