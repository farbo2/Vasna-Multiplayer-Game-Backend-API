import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { BattlePass } from './entities/battle-pass.entity';

@Injectable()
export class BattlePassRepository extends Repository<BattlePass> {
  constructor(private dataSource: DataSource) {
    super(BattlePass, dataSource.createEntityManager());
  }
  async findAllWithLevels(): Promise<BattlePass[]> {
    return this.find({
      relations: ['levels'],
    });
  }

  async findBattlePassById(id: number): Promise<BattlePass> {
    return this.findOne({ relations: ['levels'], where: { id } });
  }

  async updateBattlePass(
    id: number,
    updateData: Partial<BattlePass>,
  ): Promise<BattlePass> {
    // Find Battle Pass
    const battlePass = await this.findOne({ where: { id } });
    if (!battlePass) {
      throw new Error(`BattlePass with ID ${id} not found`);
    }

    // update Battle pass
    Object.assign(battlePass, updateData);

    // Save to Database
    return this.save(battlePass);
  }

  async deleteBattlePass(id: number): Promise<void> {
    // Check if Battle Pass Exists
    const battlePass = await this.findOne({
      where: { id },
      relations: ['levels'],
    });
    if (!battlePass) {
      throw new Error(`BattlePass with ID ${id} not found`);
    }

    // Remove Relations
    // Remove Related Levels
    if (battlePass.levels && battlePass.levels.length > 0) {
      await this.createQueryBuilder()
        .delete()
        .from('BattlePassLevel')
        .where('battlePassId = :id', { id: battlePass.id })
        .execute();

      //Remove Related Inventories
      await this.createQueryBuilder()
        .delete()
        .from('BattlePassInventory')
        .where('battlePassId = :id', { id: battlePass.id })
        .execute();
    }

    // Remove Battle pass
    await this.remove(battlePass);
  }
}
