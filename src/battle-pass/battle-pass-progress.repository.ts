import { Injectable } from '@nestjs/common';
import { BattlePassProgress } from './entities/battle-pass-progress.entity';
import { DataSource, Repository } from 'typeorm';
import { BattlePass } from './entities/battle-pass.entity';

@Injectable()
export class BattlePassProgressRepository extends Repository<BattlePassProgress> {
  constructor(private dataSource: DataSource) {
    super(BattlePassProgress, dataSource.createEntityManager());
  }
  async findBattlePassProgressByUserId(
    id: number,
  ): Promise<BattlePassProgress[]> {
    return this.find({ where: { userId: id } });
  }

  async findCurrentActiveBattlePassProgressByUserId(
    userId: number,
  ): Promise<BattlePassProgress | null> {
    const activeBattlePass = await this.manager
      .getRepository(BattlePass)
      .createQueryBuilder('battlePass')
      .where('battlePass.status = :status', { status: 'Progressing' })
      .getOne();

    if (!activeBattlePass) {
      return null;
    }

    return this.createQueryBuilder('progress')
      .where('progress.battlePassId = :battlePassId', {
        battlePassId: activeBattlePass.id,
      })
      .andWhere('progress.userId = :userId', { userId })
      .getOne();
  }
}
