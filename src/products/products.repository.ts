import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findAllProducts(): Promise<Product[]> {
    return this.find();
  }

  async findProductById(id: number): Promise<Product> {
    return this.findOne({ where: { id: id } });
  }
  async findProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return this.find({ where: { categoryId } });
  }
  async updateProduct(
    id: number,
    updateData: Partial<Product>,
  ): Promise<Product> {
    // Find Product
    const product = await this.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // update Product
    Object.assign(product, updateData);

    // Save to Database
    return this.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    // Check if Product Exists
    const product = await this.findOne({
      where: { id },
    });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // Remove Product
    await this.remove(product);
  }
}
