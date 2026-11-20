import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClanQuestRepository } from './clan-quests.repository';
import { CurrentClanQuestRepository } from './current-clan-quest.repository';
import { ClanQuestContributionRepository } from './clan-quest-contribution.repository';
import { updateClanQuestDto } from './dtos/update-clan-quest.dto';
import { createClanQuestDto } from './dtos/create-clan-quest.dto';
import { updateCurrentClanQuestDto } from './dtos/update-current-clan-quest.dto';

@Injectable()
export class ClanQuestsService {
  private readonly logger = new Logger(ClanQuestsService.name);
  constructor(
    private clanQuestRepo: ClanQuestRepository,
    private currentClanQuestRepo: CurrentClanQuestRepository,
    private clanQuestContributionRepo: ClanQuestContributionRepository,
  ) {}

  async findAllClanQuests() {
    try {
      this.logger.log('Attempting to fetch all Clan Quests');

      const clanQuests = await this.clanQuestRepo.findAllClanQuest();

      if (!clanQuests || clanQuests.length === 0) {
        this.logger.warn('No Clan Quest records found in the database');
        return [];
      }

      this.logger.log(
        `Successfully fetched ${clanQuests.length} Clan Quest records`,
      );
      return clanQuests;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Quests',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Quest data. Please try again later.',
      );
    }
  }

  async findClanQuestById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Clan Quest by ID');
      const clanQuest = await this.clanQuestRepo.findClanQuestById(id);
      if (!clanQuest) {
        this.logger.warn('No Clan Quest record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Clan Quest with ID ${id}`);
      return clanQuest;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Quest by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Quest data. Please try again later',
      );
    }
  }

  async deleteClanQuest(clanId: number) {
    this.clanQuestRepo.deleteClanQuest(clanId);
  }

  async updateClanQuest(questId: number, updateData: updateClanQuestDto) {
    this.clanQuestRepo.updateClanQuest(questId, updateData);
    return { message: 'Clan Updated' };
  }

  async createClanQuest(data: createClanQuestDto) {
    const clanQuest = this.clanQuestRepo.create(data);

    // TODO: ADD CURRENT CLAN QUEST FOR CLAN
    return this.clanQuestRepo.save(clanQuest);
  }

  // CURRENT CLAN QUEST HANDLER
  async findCurrentClanQuestById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Clan Quest by ID');
      const clanQuest =
        await this.currentClanQuestRepo.findCurrentClanQuestById(id);
      if (!clanQuest) {
        this.logger.warn('No Clan Quest record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Clan Quest with ID ${id}`);
      return clanQuest;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Quest by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Quest data. Please try again later',
      );
    }
  }

  async findActiveClanQuestByClanId(id: number) {
    try {
      this.logger.log('Attempting to fetch a Clan Quest by ID');
      const clanQuest =
        await this.currentClanQuestRepo.findActiveClanQuestByClanId(id);
      if (!clanQuest) {
        this.logger.warn('No Clan Quest record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Clan Quest with ID ${id}`);
      return clanQuest;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Clan Quest by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Clan Quest data. Please try again later',
      );
    }
  }

  async findAllDectiveClanQuestByClanId(id: number) {
    try {
      this.logger.log('Attempting to fetch Deactive Clan Quest by ID');
      const clanQuest =
        await this.currentClanQuestRepo.findAllDeactiveClanQuestByClanId(id);
      if (!clanQuest) {
        this.logger.warn('No Clan Quest record found in the database');
        return null;
      }
      this.logger.log(
        `Successfully fetched All Deactive Clan Quests with ID ${id}`,
      );
      return clanQuest;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Deactive Clan Quests by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Deactive Clan Quest data. Please try again later',
      );
    }
  }

  async updateCurrentActiveClanQuest(
    questId: number,
    updateData: updateCurrentClanQuestDto,
  ) {
    this.currentClanQuestRepo.updateCurrentClanQuest(questId, updateData);
    return { message: 'Clan Updated' };
  }
}
