import { Injectable } from '@nestjs/common';
import { BattlePassLevel } from './entities/battle-pass-level.entity';
import { Repository, DataSource } from 'typeorm';
import { BattlePassInventory } from './entities/battle-pass-inventory.entity';

@Injectable()
export class BattlePassLevelRepository extends Repository<BattlePassLevel> {
  constructor(private dataSource: DataSource) {
    super(BattlePassLevel, dataSource.createEntityManager());
  }

  async findBattlePassLevelById(id: number): Promise<BattlePassLevel> {
    return this.findOne({ relations: ['battlePass'], where: { id } });
  }

  async updateBattlePassLevel(
    id: number,
    updateData: Partial<BattlePassLevel>,
  ): Promise<BattlePassLevel> {
    // Find Battle Pass
    const battlePassLevel = await this.findOne({ where: { id } });
    if (!battlePassLevel) {
      throw new Error(`BattlePass with ID ${id} not found`);
    }

    // update Battle pass
    Object.assign(battlePassLevel, updateData);

    // Save to Database
    return this.save(battlePassLevel);
  }

  async deleteBattlePassLevel(id: number): Promise<void> {
    const battlePassLevel = await this.findOne({
      where: { id },
      relations: ['battlePass'],
    });

    if (!battlePassLevel) {
      throw new Error(`BattlePassLevel with ID ${id} not found`);
    }
    const inventoriesToDelete = await this.dataSource
      .getRepository(BattlePassInventory)
      .find({ where: { levelId: id } });

    if (inventoriesToDelete.length > 0) {
      await this.dataSource
        .getRepository(BattlePassInventory)
        .remove(inventoriesToDelete);
    }
    // remove BattlePassLevel
    await this.remove(battlePassLevel);
  }
}
