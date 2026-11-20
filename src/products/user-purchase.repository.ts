import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserPurchase } from './entities/user-purchase.entity';

@Injectable()
export class UserPurchasesRepository extends Repository<UserPurchase> {
  constructor(dataSource: DataSource) {
    super(UserPurchase, dataSource.createEntityManager());
  }

  async findAllUserPurchases(): Promise<UserPurchase[]> {
    return this.find();
  }

  async findUserPurchasesByUserId(id: number): Promise<UserPurchase[]> {
    return this.find({ where: { userId: id } });
  }
  async findUserPurchaseById(id: number): Promise<UserPurchase> {
    return this.findOne({ where: { id } });
  }
  async updateUserPurchase(
    id: number,
    updateData: Partial<UserPurchase>,
  ): Promise<UserPurchase> {
    // Find User Purchase
    const userPurchase = await this.findOne({ where: { id } });
    if (!userPurchase) {
      throw new Error(`User Purchase with ID ${id} not found`);
    }
    // update User Purchase
    Object.assign(userPurchase, updateData);

    // Save to Database
    return this.save(userPurchase);
  }

  async deleteUserPurchase(id: number): Promise<void> {
    // Check if User Purchase Exists
    const userPurchase = await this.findOne({
      where: { id },
    });
    if (!userPurchase) {
      throw new Error(`User Purchase with ID ${id} not found`);
    }
    // Remove Product Category
    await this.remove(userPurchase);
  }
}
