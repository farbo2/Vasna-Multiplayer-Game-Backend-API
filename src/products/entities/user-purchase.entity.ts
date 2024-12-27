import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

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

  @Column({ default: 'Processing' })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchasedAt: Date;
}
