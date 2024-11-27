import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  questId: number;

  @Column()
  status: string;

  @Column()
  currentPoint: number;

  @Column()
  lastUpdated: Date;
}
