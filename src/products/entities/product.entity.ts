import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: number;

  @ManyToOne(() => ProductCategory)
  category: ProductCategory;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column()
  details: string;

  @Column()
  isAvailable: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
