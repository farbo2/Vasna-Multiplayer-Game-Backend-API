import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('friends')
export class FriendsController {
  @Post()
  createFriendship(@Body() body: any) {}

  @Get('/:userid')
  getAllFriendsByUserId(@Param('userid') id: number) {}

  @Patch('/:id')
  updateFriendById(@Param('id') id: number) {}

  @Delete('/:id')
  deleteFriendById(@Param('id') id: number) {}
}
