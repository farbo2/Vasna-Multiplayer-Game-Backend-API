import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClanMember } from './entities/clan-member.entity';

@Injectable()
export class ClanMemberRepository extends Repository<ClanMember> {
  constructor(private dataSource: DataSource) {
    super(ClanMember, dataSource.createEntityManager());
  }
}
