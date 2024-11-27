import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @Column()
  type: string;

  @Column()
  relatedId: number;

  @Column()
  content: string;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: Date;
}
