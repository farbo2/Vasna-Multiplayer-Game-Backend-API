import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BattlePassRepository } from './battle-pass.repository';
import { BattlePassProgressRepository } from './battle-pass-progress.repository';
import { BattlePassLevelRepository } from './battle-pass-level.repository';
import { BattlePassInventoryRepository } from './battle-pass-inventory.repository';
import { Logger } from '@nestjs/common';
import { createBattlePassDto } from './dtos/create-battle-pass.dto';
import { BattlePass } from './entities/battle-pass.entity';
import { AddBattlePassLevelsDto } from './dtos/add-battle-pass-levels.dto';
import { BattlePassLevel } from './entities/battle-pass-level.entity';
import { CreateBattlePassInventoryDto } from './dtos/create-battle-pass-inventory.dto';
import { BattlePassInventory } from './entities/battle-pass-inventory.entity';

@Injectable()
export class BattlePassService {
  private readonly logger = new Logger(BattlePassService.name);
  constructor(
    private battlePassRepo: BattlePassRepository,
    private battlePassProgressRepo: BattlePassProgressRepository,
    private battlePassLevelRepo: BattlePassLevelRepository,
    private battlePassInventoryRepo: BattlePassInventoryRepository,
  ) {}
  // BATTLE PASS SERVICES
  async findAllBattlePassWithLevels() {
    try {
      this.logger.log('Attempting to fetch all BattlePasses with levels');

      const battlePasses = await this.battlePassRepo.findAllWithLevels();

      if (!battlePasses || battlePasses.length === 0) {
        this.logger.warn('No BattlePass records found in the database');
        return [];
      }

      this.logger.log(
        `Successfully fetched ${battlePasses.length} BattlePass records`,
      );
      return battlePasses;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching BattlePasses with levels',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePass data. Please try again later.',
      );
    }
  }

  async findBattlePassById(id: number) {
    try {
      this.logger.log('Attempting to fetch a BattlePass by ID');
      const battlePass = await this.battlePassRepo.findBattlePassById(id);
      if (!battlePass) {
        this.logger.warn('No BattlePass record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched BattlePass with ID ${id}`);
      return battlePass;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching BattlePass by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePass data. Please try again later',
      );
    }
  }

  async createBattlePass(
    createBattlePassDto: createBattlePassDto,
  ): Promise<BattlePass> {
    const battlePass = this.battlePassRepo.create(createBattlePassDto);
    return this.battlePassRepo.save(battlePass);
  }

  async addLevelsToBattlePass(
    battlePassId: number,
    addBattlePassLevelsDto: AddBattlePassLevelsDto,
  ): Promise<BattlePass> {
    const battlePass = await this.battlePassRepo.findOne({
      where: { id: battlePassId },
    });

    if (!battlePass) {
      throw new NotFoundException('BattlePass not found');
    }

    // create and save levels
    const levels = addBattlePassLevelsDto.levels.map((level) =>
      this.battlePassLevelRepo.create({ ...level, battlePass }),
    );
    await this.battlePassLevelRepo.save(levels);

    //Return Battle pass with new Levels
    return this.battlePassRepo.findOne({
      where: { id: battlePassId },
      relations: ['levels'],
    });
  }

  async updateBattlePass(
    id: number,
    updateData: Partial<BattlePass>,
  ): Promise<BattlePass> {
    try {
      return await this.battlePassRepo.updateBattlePass(id, updateData);
    } catch (error) {
      throw new Error(`Failed to update BattlePass: ${error.message}`);
    }
  }

  async deleteBattlePassById(id: number): Promise<void> {
    try {
      await this.battlePassRepo.deleteBattlePass(id);
    } catch (error) {
      throw new Error(`Failed to delete BattlePass: ${error.message}`);
    }
  }

  async findBattlePassLevelById(id: number) {
    try {
      this.logger.log('Attempting to fetch a BattlePassLevel by ID');
      const battlePassLevel =
        await this.battlePassLevelRepo.findBattlePassLevelById(id);
      if (!battlePassLevel) {
        this.logger.warn('No BattlePassLevel record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched BattlePass with ID ${id}`);
      return battlePassLevel;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching BattlePassLevel by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePassLevel data. Please try again later',
      );
    }
  }

  async updateBattlePassLevel(
    id: number,
    updateData: Partial<BattlePassLevel>,
  ): Promise<BattlePassLevel> {
    try {
      return await this.battlePassLevelRepo.updateBattlePassLevel(
        id,
        updateData,
      );
    } catch (error) {
      throw new Error(`Failed to update BattlePass: ${error.message}`);
    }
  }

  async deleteBattlePassLevelById(id: number): Promise<void> {
    try {
      await this.battlePassLevelRepo.deleteBattlePassLevel(id);
    } catch (error) {
      throw new Error(`Failed to delete BattlePassLevel: ${error.message}`);
    }
  }

  async findBattlePassInventoryById(id: number) {
    try {
      this.logger.log('Attempting to fetch a BattlePassInventory by ID');
      const battlePassInventory =
        await this.battlePassInventoryRepo.findBattlePassInventoryById(id);
      if (!battlePassInventory) {
        this.logger.warn('No BattlePassInventory record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched BattlePassInventory with ID ${id}`);
      return battlePassInventory;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching BattlePassInventory by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePassInventory data. Please try again later',
      );
    }
  }

  async findBattlePassInventoriesByLevelId(id: number) {
    try {
      this.logger.log('Attempting to fetch a BattlePassInventories by LEVELID');
      const battlePassInventories =
        await this.battlePassInventoryRepo.findBattlePassInventoriesByLevelId(
          id,
        );
      if (!battlePassInventories) {
        this.logger.warn(
          'No BattlePassInventories record found in the database',
        );
        return null;
      }
      this.logger.log(`Successfully fetched BattlePassInventory with ID ${id}`);
      return battlePassInventories;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching BattlePassInventories by LEVELID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePassInventories data. Please try again later',
      );
    }
  }

  async createBattlePassInventory(
    createBattlePassDto: CreateBattlePassInventoryDto,
  ): Promise<BattlePassInventory> {
    const battlePassInventory =
      this.battlePassInventoryRepo.create(createBattlePassDto);
    return this.battlePassInventoryRepo.save(battlePassInventory);
  }

  async updateBattlePassInventory(
    id: number,
    updateData: Partial<BattlePassInventory>,
  ): Promise<BattlePassInventory> {
    try {
      return await this.battlePassInventoryRepo.updateBattlePassInventory(
        id,
        updateData,
      );
    } catch (error) {
      throw new Error(`Failed to update BattlePassInventory: ${error.message}`);
    }
  }

  async deleteBattlePassInventoryById(id: number): Promise<void> {
    try {
      await this.battlePassInventoryRepo.deleteBattlePass(id);
    } catch (error) {
      throw new Error(
        `Failed to delete BattlePass Inventory: ${error.message}`,
      );
    }
  }

  async findBattlePassProgressByUserId(id: number) {
    try {
      this.logger.log('Attempting to fetch a BattlePassProgress by userId');
      const battlePassProgress =
        await this.battlePassProgressRepo.findBattlePassProgressByUserId(id);
      if (!battlePassProgress) {
        this.logger.warn(
          'No BattlePassInventories record found in the database',
        );
        return null;
      }
      this.logger.log(`Successfully fetched BattlePassProgress with ID ${id}`);
      return battlePassProgress;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching BattlePassProgress by userId',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePassProgressdata. Please try again later',
      );
    }
  }

  async findCurrentActiveBattlePassProgressByUserId(id: number) {
    try {
      this.logger.log(
        'Attempting to fetch a Active BattlePassProgress by UserId',
      );
      const battlePassProgress =
        await this.battlePassProgressRepo.findCurrentActiveBattlePassProgressByUserId(
          id,
        );
      if (!battlePassProgress) {
        this.logger.warn('No BattlePassInventory record found in the database');
        return null;
      }
      this.logger.log(
        `Successfully fetched Active BattlePassProgress with UserId ${id}`,
      );
      return battlePassProgress;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Active BattlePassProgress by UserId',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving BattlePassProgress data. Please try again later',
      );
    }
  }
  async progressCurrentActiveBattlePass(userId: number, xpToAdd: number) {
    // finding BattlePassProgress with Progressing BattlePass
    const activeBattlePass = await this.battlePassRepo.findOne({
      where: { status: 'Progressing' },
    });
    if (!activeBattlePass) {
      throw new Error('No active BattlePass found.');
    }

    const battlePassProgress = await this.battlePassProgressRepo.findOne({
      where: { battlePassId: activeBattlePass.id, userId },
    });
    if (!battlePassProgress) {
      throw new Error('BattlePassProgress not found for the user.');
    }

    // Add xp
    battlePassProgress.xpCollected += xpToAdd;

    // Check current level xp collected and required xp for complete level
    const currentLevel = await this.battlePassLevelRepo.findOne({
      where: { id: battlePassProgress.currentLevel },
    });
    if (!currentLevel) {
      throw new Error('Current level not found for the BattlePassProgress.');
    }

    if (battlePassProgress.xpCollected >= currentLevel.xpRequiredForComplete) {
      console.log(
        `Level up! User ${userId} has enough XP to complete level ${currentLevel.id}`,
      );
      // TODO: Check if Reward is Card or Currency and Count it
      const relatedInventories = await this.battlePassInventoryRepo.find({
        where: { levelId: currentLevel.id },
      });

      for (const inventory of relatedInventories) {
        if (inventory.rewardType === 'Card') {
          console.log(
            `Hooof! User ${userId} received a card reward: ${inventory.rewardAmount}`,
          );
        } else if (inventory.rewardType === 'Currency') {
          console.log(
            `Haaaf! User ${userId} received a currency reward: ${inventory.rewardAmount}`,
          );
        } else {
          console.log(
            `Unknown reward type for User ${userId}: ${inventory.rewardType}`,
          );
        }
      }
    }

    //  Save Changes in BattlePassProgress
    await this.battlePassProgressRepo.save(battlePassProgress);
  }
}
