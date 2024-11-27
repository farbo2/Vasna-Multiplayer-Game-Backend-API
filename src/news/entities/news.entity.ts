import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  type: string;

  @Column()
  isActive: boolean;
}
