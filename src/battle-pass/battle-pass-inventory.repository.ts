import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { BattlePassInventory } from './entities/battle-pass-inventory.entity';
import { BattlePass } from './entities/battle-pass.entity';

@Injectable()
export class BattlePassInventoryRepository extends Repository<BattlePassInventory> {
  constructor(private dataSource: DataSource) {
    super(BattlePassInventory, dataSource.createEntityManager());
  }

  async findBattlePassInventoryById(id: number): Promise<BattlePassInventory> {
    return this.findOne({ where: { id } });
  }

  async findBattlePassInventoriesByLevelId(
    id: number,
  ): Promise<BattlePassInventory[]> {
    return this.find({ where: { levelId: id } });
  }

  async updateBattlePassInventory(
    id: number,
    updateData: Partial<BattlePassInventory>,
  ): Promise<BattlePassInventory> {
    // Find Battle Pass Inventory
    const battlePassInventory = await this.findOne({ where: { id } });
    if (!battlePassInventory) {
      throw new Error(`BattlePass Inventory with ID ${id} not found`);
    }

    // update Battle pass inventory
    Object.assign(battlePassInventory, updateData);

    // Save to Database
    return this.save(battlePassInventory);
  }

  async deleteBattlePass(id: number): Promise<void> {
    // Check if Battle Pass Exists
    const battlePassInventory = await this.findOne({
      where: { id },
    });
    if (!battlePassInventory) {
      throw new Error(`BattlePass Inventory with ID ${id} not found`);
    }

    // Remove Battle pass
    await this.remove(battlePassInventory);
  }
}
