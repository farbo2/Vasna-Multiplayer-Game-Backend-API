import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { UserSelectedCard } from './entities/user-selected-card.entity';
import { UserUnlockedCard } from './entities/user-unlocked-card.entity';
import { CardsRepository } from './cards.repository';
import { UserSelectedCardRepository } from './user-selected-card.repository';
import { UserUnlockedCardRepository } from './user-unlocked-card.repository';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, UserSelectedCard, UserUnlockedCard]),
  ],
  providers: [AdminGuard, 
    CardsService,
    CardsRepository,
    UserSelectedCardRepository,
    UserUnlockedCardRepository,
    JwtAuthGuard,
  ],
  controllers: [CardsController],
})
export class CardsModule {}
