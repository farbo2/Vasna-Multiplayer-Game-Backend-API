import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { UserSelectedCardRepository } from './user-selected-card.repository';
import { UserUnlockedCardRepository } from './user-unlocked-card.repository';
import { createCardDto } from './dtos/create-card.dto';
import { Card } from './entities/card.entity';
import { UserUnlockedCard } from './entities/user-unlocked-card.entity';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);
  constructor(
    @InjectRepository(CardsRepository)
    private cardsRepo: CardsRepository,
    @InjectRepository(UserSelectedCardRepository)
    private userSelectedCardRepo: UserSelectedCardRepository,
    @InjectRepository(UserUnlockedCardRepository)
    private userUnlockedCardRepo: UserUnlockedCardRepository,
  ) {}

  async findAllCards() {
    try {
      this.logger.log('Attempting to fetch all Cards');

      const cards = await this.cardsRepo.findAllCards();

      if (!cards || cards.length === 0) {
        this.logger.warn('No Cards records found in the database');
        return [];
      }

      this.logger.log(`Successfully fetched ${cards.length} Card records`);
      return cards;
    } catch (error) {
      this.logger.error('Error occurred while fetching Cards', error.stack);
      throw new InternalServerErrorException(
        'An error occurred while retrieving Cards data. Please try again later.',
      );
    }
  }

  async findCardById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Card by ID');
      const card = await this.cardsRepo.findCardById(id);
      if (!card) {
        this.logger.warn('No Card record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Card with ID ${id}`);
      return card;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Card by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Card data. Please try again later',
      );
    }
  }
  async findAllAvailableCards() {
    try {
      this.logger.log('Attempting to fetch all Available Cards');

      const cards = await this.cardsRepo.findAllAvailableCards();

      if (!cards || cards.length === 0) {
        this.logger.warn('No Available Cards records found in the database');
        return [];
      }

      this.logger.log(`Successfully fetched ${cards.length} Available records`);
      return cards;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Available Cards with levels',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Available Cards data. Please try again later.',
      );
    }
  }

  async findAllCardsByType(type: string) {
    try {
      this.logger.log('Attempting to fetch all Cards By Type');

      const cards = await this.cardsRepo.findAllCardsByType(type);

      if (!cards || cards.length === 0) {
        this.logger.warn(`No ${type} Cards records found in the database`);
        return [];
      }

      this.logger.log(`Successfully fetched ${cards.length} Available records`);
      return cards;
    } catch (error) {
      this.logger.error('Error occurred while fetching Cards', error.stack);
      throw new InternalServerErrorException(
        'An error occurred while retrieving Cards data. Please try again later.',
      );
    }
  }
  async createCard(createCardDto: createCardDto): Promise<Card> {
    const card = this.cardsRepo.create(createCardDto);
    return this.cardsRepo.save(card);
  }

  async deleteCard(cardId: number): Promise<void> {
    await this.cardsRepo.deleteCard(cardId);
  }

  async updateCardById(id: number, updateData: Partial<Card>): Promise<Card> {
    try {
      return await this.cardsRepo.updateCard(id, updateData);
    } catch (error) {
      throw new Error(`Failed to update Card: ${error.message}`);
    }
  }

  async unlockCard(userId: number, cardId: number): Promise<UserUnlockedCard> {
    // Find Card
    const card = await this.cardsRepo.findCardById(cardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    // create new Record
    const unlockedCard = this.userUnlockedCardRepo.create({
      userId,
      card,
      level: 1,
      unlockedAt: Date.now(),
    });

    // Save to Database
    return this.userUnlockedCardRepo.save(unlockedCard);
  }

  async findAllUserUnlockedCards(userId: number) {
    try {
      this.logger.log('Attempting to fetch all Available Cards');

      const cards =
        await this.userUnlockedCardRepo.findAllUserUnlockedCards(userId);

      if (!cards || cards.length === 0) {
        this.logger.warn('No Unlocked Cards records found in the database');
        return [];
      }

      this.logger.log(
        `Successfully fetched ${cards.length} Unlocked Cards records`,
      );
      return cards;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Unlocked Cards with levels',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Unlocked Cards data. Please try again later.',
      );
    }
  }
  async levelUpUnlockedCard(id: number): Promise<UserUnlockedCard> {
    return this.userUnlockedCardRepo.levelUpUnlockedCard(id);
  }

  async selectCardByUnlockedCardId(userId: number, cardId: number) {
    const selectedAt = new Date();
    await this.userSelectedCardRepo.selectCardByUnlockedCardId(
      userId,
      cardId,
      selectedAt,
    );
  }

  async getAllUserSelectedCards(userId: number) {
    try {
      this.logger.log('Attempting to fetch all User Selected Cards');

      const userSelectedcards = await this.userSelectedCardRepo.find({
        where: { userId },
      });

      if (!userSelectedcards || userSelectedcards.length === 0) {
        this.logger.warn(
          'No user Selected cards records found in the database',
        );
        return [];
      }

      this.logger.log(
        `Successfully fetched ${userSelectedcards.length} User Selected Cards records`,
      );
      return userSelectedcards;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching User Selected Cards with levels',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving User Selected Cards data. Please try again later.',
      );
    }
  }

  async unselectUnlockedCardById(cardId: number): Promise<void> {
    await this.userSelectedCardRepo.unselectUnlockedCardById(cardId);
  }
}
