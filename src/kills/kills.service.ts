import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KillsRepository } from './kills.repository';
import { createKillDto } from './dtos/create-kill.dto';

@Injectable()
export class KillsService {
  private readonly logger = new Logger(KillsService.name);
  constructor(
    @InjectRepository(KillsRepository)
    private killRepo: KillsRepository,
  ) {}

  async createKill(data: createKillDto) {
    const player = await this.killRepo.findOne({
      where: { id: data.playerId },
    });
    if (!player) {
      throw new Error('Player not found');
    }

    const kill = this.killRepo.create(data);

    return this.killRepo.save(kill);
  }

  async findAllKillsByMatchId(matchId: number, playerId: number) {
    try {
      this.logger.log('Attempting to fetch a Kill by Match ID');
      const kill = await this.killRepo.findAllUserKillsByMatchId(
        matchId,
        playerId,
      );
      if (!kill) {
        this.logger.warn('No Kill record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Kill with Match ID ${matchId}`);
      return kill;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Kill by Match ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Kill data. Please try again later',
      );
    }
  }

  async findAllKillsByCardType(cardType: string, playerId: number) {
    try {
      this.logger.log('Attempting to fetch a Kill by Type');
      const kill = await this.killRepo.findAllUserKillsByCardName(
        cardType,
        playerId,
      );
      if (!kill) {
        this.logger.warn('No Kill record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Kill By Card Type ${cardType}`);
      return kill;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Kill by Card Type',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Kill data. Please try again later',
      );
    }
  }

  async findAllKillsByCardName(cardName: string, playerId: number) {
    try {
      this.logger.log('Attempting to fetch a Kill by Name');
      const kill = await this.killRepo.findAllUserKillsByCardName(
        cardName,
        playerId,
      );
      if (!kill) {
        this.logger.warn('No Kill record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Kill By Card Name ${cardName}`);
      return kill;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Kill by Card Name',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Kill data. Please try again later',
      );
    }
  }

  async findAllKillsByDate(fromDate: Date, toDate: Date, playerId: number) {
    try {
      this.logger.log('Attempting to fetch a Kill by Date');
      const kill = await this.killRepo.findAllUserKillsByDate(
        fromDate,
        toDate,
        playerId,
      );
      if (!kill) {
        this.logger.warn('No Kill record found in the database');
        return null;
      }
      this.logger.log(
        `Successfully fetched Kill By Date ${fromDate} - ${toDate}`,
      );
      return kill;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Kill by Date',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Kill data. Please try again later',
      );
    }
  }
}
