import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Product } from './Product.entity';

@Entity()
export class UserPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column()
  status: boolean;

  @Column()
  purchasedAt: Date;
}
