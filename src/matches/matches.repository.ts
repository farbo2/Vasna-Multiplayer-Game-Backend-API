import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesRepository extends Repository<Match> {
  constructor(private dataSource: DataSource) {
    super(Match, dataSource.createEntityManager());
  }
  async findAllWinsMatchByUserId(userId: number): Promise<Match[]> {
    return this.find({ where: { winnerId: userId } });
  }
  async findMatchById(id: number): Promise<Match> {
    return this.findOne({ where: { id } });
  }

  async updateMatch(id: number, updateData: Partial<Match>): Promise<Match> {
    // Find Match
    const match = await this.findOne({ where: { id } });
    if (!match) {
      throw new Error(`Match with ID ${id} not found`);
    }
    // update Match
    Object.assign(match, updateData);

    // Save to Database
    return this.save(match);
  }
}
