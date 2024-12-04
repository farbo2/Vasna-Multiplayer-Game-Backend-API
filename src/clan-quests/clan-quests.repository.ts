import { Injectable } from '@nestjs/common';
import { ClanQuest } from './entities/clan-quest.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClanQuestRepository extends Repository<ClanQuest> {
  constructor(private dataSource: DataSource) {
    super(ClanQuest, dataSource.createEntityManager());
  }

  async findAllClanQuest(): Promise<ClanQuest[]> {
    return this.find();
  }

  async findClanQuestById(id: number): Promise<ClanQuest> {
    return this.findOne({ where: { id } });
  }

  async updateClanQuest(
    id: number,
    updateData: Partial<ClanQuest>,
  ): Promise<ClanQuest> {
    // Find Clan Quest
    const clanQuest = await this.findOne({ where: { id } });
    if (!clanQuest) {
      throw new Error(`Clan Quest with ID ${id} not found`);
    }

    // update Clan quest
    Object.assign(clanQuest, updateData);

    // Save to Database
    return this.save(clanQuest);
  }

  async deleteClanQuest(id: number): Promise<void> {
    // Check if Clan Quest Exists
    const clanQuest = await this.findOne({
      where: { id },
    });
    if (!clanQuest) {
      throw new Error(`ClanQuest with ID ${id} not found`);
    }

    // Remove Relations
    // Remove Related Current Quests
    await this.createQueryBuilder()
      .delete()
      .from('CurrentClanQuest')
      .where('clanId = :id', { id: clanQuest.id })
      .execute();

    //Remove Related Contributions
    await this.createQueryBuilder()
      .delete()
      .from('ClanQuestContribution')
      .where('clanId = :id', { id: clanQuest.id })
      .execute();

    // Remove Clan Quest
    await this.remove(clanQuest);
  }
}
