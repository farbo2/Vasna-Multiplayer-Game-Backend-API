import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ type: 'int', default: 0 })
  discount: number;

  @Column({ type: 'boolean', default: false })
  hasDiscount: boolean;

  @Column({ default: 'Rial' })
  currency: string;

  @Column({ nullable: true })
  details: string;

  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
