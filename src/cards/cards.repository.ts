import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { UserUnlockedCard } from './entities/user-unlocked-card.entity';
import { UserSelectedCard } from './entities/user-selected-card.entity';

@Injectable()
export class CardsRepository extends Repository<Card> {
  constructor(private dataSource: DataSource) {
    super(Card, dataSource.createEntityManager());
  }
  async findAllCards(): Promise<Card[]> {
    return this.find();
  }

  async findCardById(id: number): Promise<Card> {
    return this.findOne({ where: { id } });
  }

  async findAllAvailableCards(): Promise<Card[]> {
    return this.find({ where: { isAvailable: true } });
  }
  async findAllCardsByType(type: string): Promise<Card[]> {
    return this.find({ where: { type: type } });
  }
  async updateCard(id: number, updateData: Partial<Card>): Promise<Card> {
    // Find Card
    const card = await this.findOne({ where: { id } });
    if (!card) {
      throw new Error(`Card with ID ${id} not found`);
    }
    // update Card
    Object.assign(card, updateData);
    // Save to Database
    return this.save(card);
  }

  async deleteCard(cardId: number): Promise<void> {
    const unlockedCardRepo = this.dataSource.getRepository(UserUnlockedCard);
    const selectedCardRepo = this.dataSource.getRepository(UserSelectedCard);

    //  Check if Card Exists
    const card = await this.findOne({ where: { id: cardId } });
    if (!card) {
      throw new Error(`Card with ID ${cardId} not found`);
    }

    //  Find UserUnlockedCard Related To Card
    const unlockedCards = await unlockedCardRepo.find({
      where: { card: { id: cardId } },
    });

    // Remove Related UserSelectedCards and UserUnlockedCards
    for (const unlockedCard of unlockedCards) {
      await selectedCardRepo.delete({ card: { id: unlockedCard.id } });
      await unlockedCardRepo.delete(unlockedCard.id);
    }

    // Remove Card
    await this.delete(cardId);
  }
}
