import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Clan } from './entities/clan.entity';

@Injectable()
export class ClansRepository extends Repository<Clan> {
  constructor(private dataSource: DataSource) {
    super(Clan, dataSource.createEntityManager());
  }
  async findAllClans(): Promise<Clan[]> {
    return this.find({ relations: ['leader', 'members'] });
  }
}
