import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  @Post()
  sendNotificationToUser(@Body() body: any) {}

  @Get('/user/:userid')
  getAllUnseenNotificationsByUserId(@Param('userid') userId: number) {}
}
