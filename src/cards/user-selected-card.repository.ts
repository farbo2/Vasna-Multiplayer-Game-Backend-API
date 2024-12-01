import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserSelectedCard } from './entities/user-selected-card.entity';
import { UserUnlockedCard } from './entities/user-unlocked-card.entity';

@Injectable()
export class UserSelectedCardRepository extends Repository<UserSelectedCard> {
  constructor(private dataSource: DataSource) {
    super(UserSelectedCard, dataSource.createEntityManager());
  }

  async selectCardByUnlockedCardId(
    userId: number,
    cardId: number,
    selectedAt: Date,
  ): Promise<UserSelectedCard> {
    const unlockedCardRepo = this.dataSource.getRepository(UserUnlockedCard);
    const unlockedCard = await unlockedCardRepo.findOne({
      where: { id: cardId },
    });
    const newSelectedCard = this.create({
      userId,
      card: unlockedCard,
      selectedAt,
    });
    return this.save(newSelectedCard);
  }

  async unselectUnlockedCardById(cardId: number): Promise<void> {
    //  Check if Card Exists
    const card = await this.findOne({ where: { id: cardId } });
    if (!card) {
      throw new Error(`UnselectedCard with ID ${cardId} not found`);
    }

    // Remove Card (Unselect)
    await this.delete(cardId);
  }
}
