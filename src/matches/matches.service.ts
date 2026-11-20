import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MatchesRepository } from './matches.repository';
import { createMatchDto } from './dtos/create-match.dto';
import { updateMatchDto } from './dtos/update-match.dto';

@Injectable()
export class MatchesService {
  private readonly logger = new Logger(MatchesService.name);
  constructor(
    private matchRepo: MatchesRepository,
  ) {}
  async createMatch(data: createMatchDto) {
    const match = this.matchRepo.create(data);

    return this.matchRepo.save(match);
  }

  async findAllWinsMatchByUserId(userId: number) {
    try {
      this.logger.log('Attempting to fetch a Match by User ID');
      const matches = await this.matchRepo.findAllWinsMatchByUserId(userId);
      if (!matches) {
        this.logger.warn('No Match record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Matches with User ID: ${userId}`);
      return matches;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Matches by User ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Match data. Please try again later',
      );
    }
  }

  async findMatchById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Match by User ID');
      const match = await this.matchRepo.findMatchById(id);
      if (!match) {
        this.logger.warn('No Match record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Matche with ID: ${id}`);
      return match;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Match by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Match data. Please try again later',
      );
    }
  }
  async deleteFriend(matchId: number) {
    this.matchRepo.delete(matchId);
  }

  async updateMatch(matchId: number, updateData: updateMatchDto) {
    this.matchRepo.updateMatch(matchId, updateData);
    return { message: 'Match Updated' };
  }
}
