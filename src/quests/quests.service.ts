import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quest } from './entities/quest.entity';
import { UserQuest } from './entities/user-quest.entity';

export interface QuestInput {
  title?: string; description?: string; type?: string; targetPoint?: number;
  rewardType?: string; rewardAmount?: number; startDate?: Date; endDate?: Date; isActive?: boolean;
}

@Injectable()
export class QuestsService {
  constructor(
    @InjectRepository(Quest) private readonly quests: Repository<Quest>,
    @InjectRepository(UserQuest) private readonly userQuests: Repository<UserQuest>,
  ) {}

  findAll(): Promise<Quest[]> { return this.quests.find({ order: { id: 'ASC' } }); }

  findActive(): Promise<Quest[]> {
    const now = new Date();
    return this.quests.createQueryBuilder('quest')
      .where('quest.isActive = :active', { active: true })
      .andWhere('quest.startDate <= :now AND quest.endDate >= :now', { now })
      .orderBy('quest.startDate', 'ASC').getMany();
  }

  async createQuest(input: QuestInput): Promise<Quest> {
    return this.quests.save(this.quests.create(input));
  }

  async updateQuest(id: number, input: QuestInput): Promise<Quest> {
    const quest = await this.quests.findOne({ where: { id } });
    if (!quest) throw new NotFoundException('Quest not found');
    Object.assign(quest, input);
    return this.quests.save(quest);
  }

  async createUserQuest(userId: number, questId: number): Promise<UserQuest> {
    const quest = await this.quests.findOne({ where: { id: questId, isActive: true } });
    if (!quest) throw new NotFoundException('Active quest not found');
    const existing = await this.userQuests.findOne({ where: { userId, questId } });
    if (existing) throw new ForbiddenException('User already has this quest');
    return this.userQuests.save(this.userQuests.create({ userId, questId, currentPoint: 0, status: 'Processing' }));
  }

  async updateUserQuest(id: number, userId: number, input: { currentPoint?: number; status?: string }): Promise<UserQuest> {
    const userQuest = await this.userQuests.findOne({ where: { id } });
    if (!userQuest) throw new NotFoundException('User quest not found');
    if (input.currentPoint !== undefined) userQuest.currentPoint = Math.max(0, Math.min(input.currentPoint, Number.MAX_SAFE_INTEGER));
    if (input.status !== undefined) {
      if (!['Processing', 'Completed', 'Claimed', 'Failed'].includes(input.status)) throw new ForbiddenException('Invalid quest status');
      userQuest.status = input.status;
    }
    userQuest.lastUpdated = new Date();
    return this.userQuests.save(userQuest);
  }

  async getUserQuest(id: number, userId: number): Promise<UserQuest> {
    const quest = await this.userQuests.findOne({ where: { id } });
    if (!quest) throw new NotFoundException('User quest not found');
    if (quest.userId !== userId) throw new ForbiddenException();
    return quest;
  }

  getActiveUserQuests(userId: number): Promise<UserQuest[]> {
    return this.userQuests.find({ where: { userId, status: 'Processing' }, order: { lastUpdated: 'DESC' } });
  }
}
