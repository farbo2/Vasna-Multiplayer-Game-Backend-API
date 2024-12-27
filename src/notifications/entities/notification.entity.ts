import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @Column({ default: 'public' })
  type: string;

  @Column({ nullable: true })
  relatedId: number;

  @Column()
  content: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
