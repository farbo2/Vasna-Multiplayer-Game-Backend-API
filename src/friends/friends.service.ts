import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendsRepository } from './friends.repository';
import { createFriendDto } from './dtos/create-friend.dto';
import { UsersRepository } from 'src/users/users.repository';
import { updateFriendDto } from './dtos/update-friend.dto';

@Injectable()
export class FriendsService {
  private readonly logger = new Logger(FriendsService.name);
  constructor(
    @InjectRepository(FriendsRepository)
    private friendRepo: FriendsRepository,
    @InjectRepository(UsersRepository)
    private usersRepo: UsersRepository,
  ) {}

  async createFriend(data: createFriendDto) {
    const friend = await this.usersRepo.findOne({
      where: { id: data.friendId },
    });
    if (!friend) {
      throw new Error('Leader not found');
    }
    var friendShipData = {
      playerId: data.playerId,
      friend: friend,
      status: data.status,
    };
    const friendShip = this.friendRepo.create(friendShipData);

    return this.friendRepo.save(friendShip);
  }

  async findAllFriendsByUserId(id: number) {
    try {
      this.logger.log('Attempting to fetch Friends by User ID');
      const friend = await this.friendRepo.findAllFriendsByUserId(id);
      if (!friend) {
        this.logger.warn('No Friend record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Friend with ID ${id}`);
      return friend;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Friend by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Friend data. Please try again later',
      );
    }
  }

  async deleteFriend(friendId: number) {
    this.friendRepo.deleteFriend(friendId);
  }

  async updateFriend(friendId: number, updateData: updateFriendDto) {
    this.friendRepo.updateFriend(friendId, updateData);
    return { message: 'Friend Updated' };
  }
}
