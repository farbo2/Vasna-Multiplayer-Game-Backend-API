import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { createNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    private notificationRepo: NotificationsRepository,
  ) {}

  async createNotification(data: createNotificationDto) {
    const notification = this.notificationRepo.create(data);

    return this.notificationRepo.save(notification);
  }

  async findAllUnseenNotificationsByUserId(playerId: number) {
    try {
      this.logger.log('Attempting to fetch a Unseen Notifications by playerId');
      const notifs =
        await this.notificationRepo.findAllUnseenNotificationsByUserId(
          playerId,
        );
      if (!notifs) {
        this.logger.warn('No Notification record found in the database');
        return null;
      }
      this.logger.log(
        `Successfully fetched Notifications with PlayerId ${playerId}`,
      );
      return notifs;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Notifications by PlayerId',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Notifications data. Please try again later',
      );
    }
  }
}
