import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  deviceId: string;

  @Column()
  password: string;

  @Column()
  xp: number;

  @Column()
  coins: number;

  @Column()
  bankNotes: number;

  @Column()
  isOnline: boolean;

  @Column()
  lastLogin: Date;

  @Column()
  createdAt: Date;
}
