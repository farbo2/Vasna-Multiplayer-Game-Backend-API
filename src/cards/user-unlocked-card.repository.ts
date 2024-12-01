import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserUnlockedCard } from './entities/user-unlocked-card.entity';
import { UserSelectedCard } from './entities/user-selected-card.entity';

@Injectable()
export class UserUnlockedCardRepository extends Repository<UserUnlockedCard> {
  constructor(private dataSource: DataSource) {
    super(UserUnlockedCard, dataSource.createEntityManager());
  }

  async findAllUserUnlockedCards(userId: number): Promise<UserUnlockedCard[]> {
    return this.find({ where: { userId } });
  }
  async levelUpUnlockedCard(id: number): Promise<UserUnlockedCard> {
    const unlockedCard = await this.findOne({ where: { id } });
    if (!unlockedCard) {
      throw new Error(`UserUnlockedCard with ID ${id} not found`);
    }

    // level up
    unlockedCard.level += 1;

    // Save To Database
    return this.save(unlockedCard);
  }
}
