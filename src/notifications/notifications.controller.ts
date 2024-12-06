import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createNotificationDto } from './dtos/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @Post()
  sendNotificationToUser(@Body() body: createNotificationDto) {
    this.notificationsService.createNotification(body);
  }

  @Get('/user/:userid')
  getAllUnseenNotificationsByUserId(@Param('userid') userId: string) {
    const numericId = parseInt(userId, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    this.notificationsService.findAllUnseenNotificationsByUserId(numericId);
  }
}
