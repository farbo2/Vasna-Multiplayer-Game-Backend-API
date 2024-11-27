import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NewsStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  newsId: number;

  @Column()
  isRead: boolean;

  @Column()
  ReadAt: Date;
}
