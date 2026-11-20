import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { createNotificationDto } from './dtos/create-notification.dto';
import { NotificationsService } from './notifications.service';
import { Request } from 'express';
import { AuthenticatedUser } from '../guards/jwt-auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @UseGuards(AdminGuard)
  @Post()
  sendNotificationToUser(@Body() body: createNotificationDto) {
    return this.notificationsService.createNotification(body);
  }

  @Get('/user/:userid')
  getAllUnseenNotificationsByUserId(@Param('userid') userId: string, @Req() req: Request & { user: AuthenticatedUser }) {
    const numericId = parseInt(userId, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    if (numericId !== req.user.id && req.user.role !== 'admin') throw new ForbiddenException();
    return this.notificationsService.findAllUnseenNotificationsByUserId(numericId);
  }
}
