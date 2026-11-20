import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrivateMessage } from './entities/private-message.entity';

@Injectable()
export class PrivateMessagesService {
  constructor(@InjectRepository(PrivateMessage) private readonly messages: Repository<PrivateMessage>) {}

  getConversation(userId: number, otherUserId: number): Promise<PrivateMessage[]> {
    return this.messages.createQueryBuilder('message')
      .where('(message.senderId = :userId AND message.recieverId = :otherUserId)', { userId, otherUserId })
      .orWhere('(message.senderId = :otherUserId AND message.recieverId = :userId)', { userId, otherUserId })
      .orderBy('message.sentAt', 'ASC').getMany();
  }

  async getBySender(senderId: number, requesterId: number): Promise<PrivateMessage[]> {
    if (senderId !== requesterId) throw new ForbiddenException();
    return this.messages.find({ where: { senderId }, order: { sentAt: 'ASC' } });
  }

  async getByReceiver(receiverId: number, requesterId: number): Promise<PrivateMessage[]> {
    if (receiverId !== requesterId) throw new ForbiddenException();
    return this.messages.find({ where: { recieverId: receiverId }, order: { sentAt: 'ASC' } });
  }

  async create(senderId: number, receiverId: number, message: string): Promise<PrivateMessage> {
    if (senderId === receiverId) throw new ForbiddenException('Cannot send a message to yourself');
    return this.messages.save(this.messages.create({ senderId, recieverId: receiverId, message: message.trim() }));
  }

  async edit(id: number, senderId: number, message: string): Promise<PrivateMessage> {
    const entity = await this.findOne(id);
    if (entity.senderId !== senderId) throw new ForbiddenException();
    if (entity.isRead) throw new ForbiddenException('A message cannot be edited after it has been read');
    entity.message = message.trim();
    return this.messages.save(entity);
  }

  async markSeen(id: number, receiverId: number): Promise<PrivateMessage> {
    const entity = await this.findOne(id);
    if (entity.recieverId !== receiverId) throw new ForbiddenException();
    entity.isRead = true;
    return this.messages.save(entity);
  }

  async remove(id: number, requesterId: number): Promise<{ message: string }> {
    const entity = await this.findOne(id);
    if (entity.senderId !== requesterId && entity.recieverId !== requesterId) throw new ForbiddenException();
    await this.messages.remove(entity);
    return { message: 'Message deleted successfully' };
  }

  private async findOne(id: number): Promise<PrivateMessage> {
    const entity = await this.messages.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Message not found');
    return entity;
  }
}
