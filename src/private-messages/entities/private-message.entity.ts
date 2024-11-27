import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrivateMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  recieverId: number;

  @Column()
  message: string;

  @Column()
  sentAt: Date;

  @Column()
  isRead: boolean;
}
