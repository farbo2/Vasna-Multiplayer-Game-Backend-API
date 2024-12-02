import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ClanRequest } from './entities/clan-request.entity';

@Injectable()
export class ClanRequestRepository extends Repository<ClanRequest> {
  constructor(private dataSource: DataSource) {
    super(ClanRequest, dataSource.createEntityManager());
  }

  async findAllBySenderId(senderId: number): Promise<ClanRequest[]> {
    return this.find({
      where: { player: { id: senderId } },
      relations: ['player'],
    });
  }

  async findAllByClanId(clanId: number): Promise<ClanRequest[]> {
    return this.find({
      where: { clanId: clanId },
      relations: ['player'],
    });
  }

  async findById(id: number): Promise<ClanRequest> {
    return this.findOne({
      where: { id: id },
      relations: ['player'],
    });
  }
}
