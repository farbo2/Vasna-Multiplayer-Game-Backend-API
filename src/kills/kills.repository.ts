import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { Kill } from './entities/kill.entity';

@Injectable()
export class KillsRepository extends Repository<Kill> {
  constructor(private dataSource: DataSource) {
    super(Kill, dataSource.createEntityManager());
  }

  async findAllUserKillsByMatchId(
    matchId: number,
    playerId: number,
  ): Promise<Kill[]> {
    return this.find({ where: { matchId, playerId } });
  }
  async findAllUserKillsByCardName(
    cardName: string,
    playerId: number,
  ): Promise<Kill[]> {
    return this.find({ where: { cardName, playerId } });
  }
  async findAllUserKillsByCardType(
    cardType: string,
    playerId: number,
  ): Promise<Kill[]> {
    return this.find({ where: { cardType, playerId } });
  }
  async findAllUserKillsByDate(
    fromDate: Date,
    toDate: Date,
    playerId: number,
  ): Promise<Kill[]> {
    return this.find({
      where: { killedAt: Between(fromDate, toDate), playerId },
    });
  }
}
