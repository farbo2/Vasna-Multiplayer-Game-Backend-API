import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { createFriendDto } from './dtos/create-friend.dto';
import { updateFriendDto } from './dtos/update-friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}
  @Post()
  createFriendship(@Body() body: createFriendDto) {
    return this.friendsService.createFriend(body);
  }

  @Get('/:userid')
  getAllFriendsByUserId(@Param('userid') userId: string) {
    const numericId = parseInt(userId, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.friendsService.findAllFriendsByUserId(numericId);
  }

  @Patch('/:id')
  updateFriendById(@Param('id') id: string, @Body() body: updateFriendDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.friendsService.updateFriend(numericId, body);
  }

  @Delete('/:id')
  deleteFriendById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.friendsService.deleteFriend(numericId);
  }
}
