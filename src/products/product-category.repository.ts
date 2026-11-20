import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoriesRepository extends Repository<ProductCategory> {
  constructor(dataSource: DataSource) {
    super(ProductCategory, dataSource.createEntityManager());
  }

  async findAllProductCategories(): Promise<ProductCategory[]> {
    return this.find();
  }

  async findProductCategoryById(id: number): Promise<ProductCategory> {
    return this.findOne({ where: { id: id } });
  }

  async updateProductCategory(
    id: number,
    updateData: Partial<ProductCategory>,
  ): Promise<ProductCategory> {
    // Find Product Category
    const productCategory = await this.findOne({ where: { id } });
    if (!productCategory) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // update Product Category
    Object.assign(productCategory, updateData);

    // Save to Database
    return this.save(productCategory);
  }

  async deleteProductCategory(id: number): Promise<void> {
    // Check if Product Category Exists
    const productCategory = await this.findOne({
      where: { id },
    });
    if (!productCategory) {
      throw new Error(`Product with ID ${id} not found`);
    }
    // Remove Product Category
    await this.remove(productCategory);
  }
}
