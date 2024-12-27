import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { Move } from './entities/move.entity';

@Injectable()
export class MovesRepository extends Repository<Move> {
    constructor(private dataSource: DataSource) {
        super(Move, dataSource.createEntityManager());
      }
    async findAllUserMovesByTypeAndDate(
        playerId: number,
        moveType: string,
        fromDate: Date,
        toDate: Date,
      ): Promise<Move[]> {
        return this.find({
          where: { moveDate: Between(fromDate, toDate), playerId,moveType },
        });
      }
}
