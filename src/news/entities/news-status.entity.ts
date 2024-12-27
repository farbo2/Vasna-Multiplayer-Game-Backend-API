import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NewsStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  newsId: number;

  @Column({ nullable: true, type: 'boolean', default: false })
  isRead: boolean;

  @Column({ nullable: true })
  ReadAt: Date;
}
