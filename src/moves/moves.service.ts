import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MovesRepository } from './moves.repository';
import { createMoveDto } from './dtos/create-move.dto';

@Injectable()
export class MovesService {
  private readonly logger = new Logger(MovesService.name);
  constructor(
    private movesRepo: MovesRepository,
  ) {}

  async createMove(data: createMoveDto) {
    const move = this.movesRepo.create(data);

    return this.movesRepo.save(move);
  }

  async findAllUserMovesByTypeAndDate(
    playerId: number,
    moveType: string,
    fromDate: Date,
    toDate: Date,
  ) {
    try {
      this.logger.log('Attempting to fetch a Kill by Match ID');
      const moves = await this.movesRepo.findAllUserMovesByTypeAndDate(
        playerId,
        moveType,
        fromDate,
        toDate,
      );
      if (!moves) {
        this.logger.warn('No Move record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Moves with Player ID ${playerId}`);
      return moves;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Moves by Player ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Moves data. Please try again later',
      );
    }
  }
}
