import { Injectable } from '@nestjs/common';
import { Friend } from './entities/friend.entity';
import { DataSource, Repository } from 'typeorm';
import { createFriendDto } from './dtos/create-friend.dto';

@Injectable()
export class FriendsRepository extends Repository<Friend> {
  constructor(private dataSource: DataSource) {
    super(Friend, dataSource.createEntityManager());
  }

  async findAllFriendsByUserId(id: number): Promise<Friend[]> {
    return this.find({ where: { playerId: id } });
  }

  async updateFriend(id: number, updateData: Partial<Friend>): Promise<Friend> {
    // Find Friend
    const friend = await this.findOne({ where: { id } });
    if (!friend) {
      throw new Error(`Friend with ID ${id} not found`);
    }
    // update Friend
    Object.assign(friend, updateData);

    // Save to Database
    return this.save(friend);
  }

  async deleteFriend(id: number): Promise<void> {
    // Check if Friend Exists
    const friend = await this.findOne({
      where: { id },
    });
    if (!friend) {
      throw new Error(`Friend with ID ${id} not found`);
    }
    // Remove Friend
    await this.remove(friend);
  }
}
