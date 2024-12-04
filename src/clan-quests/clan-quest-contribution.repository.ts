import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClanQuestContribution } from './entities/clan-quest-contribution.entity';

@Injectable()
export class ClanQuestContributionRepository extends Repository<ClanQuestContribution> {
  constructor(private dataSource: DataSource) {
    super(ClanQuestContribution, dataSource.createEntityManager());
  }
}
