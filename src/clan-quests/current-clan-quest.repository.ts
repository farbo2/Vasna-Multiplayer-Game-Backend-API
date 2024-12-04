import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CurrentClanQuest } from './entities/current-clan-quest.entity';

@Injectable()
export class CurrentClanQuestRepository extends Repository<CurrentClanQuest> {
  constructor(private dataSource: DataSource) {
    super(CurrentClanQuest, dataSource.createEntityManager());
  }

  async findCurrentClanQuestById(id: number): Promise<CurrentClanQuest> {
    return this.findOne({ where: { id } });
  }

  async findAllDeactiveClanQuestByClanId(
    clanId: number,
  ): Promise<CurrentClanQuest[]> {
    return this.find({ where: { clan_id: clanId, isActive: false } });
  }

  async findActiveClanQuestByClanId(clanId: number): Promise<CurrentClanQuest> {
    return this.findOne({ where: { clan_id: clanId, isActive: true } });
  }

  async updateCurrentClanQuest(
    id: number,
    updateData: Partial<CurrentClanQuest>,
  ): Promise<CurrentClanQuest> {
    // Find Current Clan Quest
    const currentClanQuest = await this.findOne({ where: { id } });
    if (!currentClanQuest) {
      throw new Error(`Current Clan Quest with ID ${id} not found`);
    }

    // update Current Clan quest
    Object.assign(currentClanQuest, updateData);

    // Save to Database
    return this.save(currentClanQuest);
  }
}
