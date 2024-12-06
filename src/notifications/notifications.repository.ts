import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsRepository extends Repository<Notification> {
  constructor(private dataSource: DataSource) {
    super(Notification, dataSource.createEntityManager());
  }

  async findAllUnseenNotificationsByUserId(
    playerId: number,
  ): Promise<Notification[]> {
    return this.find({ where: { playerId, isRead: false } });
  }
}
