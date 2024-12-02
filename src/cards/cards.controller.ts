import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createCardDto } from './dtos/create-card.dto';
import { updateCardDto } from './dtos/update-card.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}
  //CARD HANDLERS
  @Get()
  getAllCards() {
    return this.cardsService.findAllCards();
  }

  @Post()
  createCard(@Body() body: createCardDto) {
    return this.cardsService.createCard(body);
  }

  @Get('/:id')
  getCardById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.cardsService.findCardById(numericId);
  }

  @Delete('/:id')
  removeCardById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.cardsService.deleteCard(numericId);
  }

  @Patch('/:id')
  updateCardById(@Param('id') id: string, @Body() body: updateCardDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.cardsService.updateCardById(numericId, body);
  }

  @Get('/available')
  getAllAvailableCards() {
    return this.cardsService.findAllAvailableCards();
  }

  @Get('/type/:type')
  getCardsByType(@Param('type') type: string) {
    return this.cardsService.findAllCardsByType(type);
  }

  //SELECTED CARDS HANDLER
  @Post('/select')
  selectCardByUnlockedCardId(
    @Param('userId') userId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardsService.selectCardByUnlockedCardId(userId, cardId);
  }

  @Get('/selected')
  getAllUserSelectedCards(@Body('userId') userId: number) {
    return this.cardsService.getAllUserSelectedCards(userId);
  }

  @Delete('/unselect/:id')
  unselectCardById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.cardsService.unselectUnlockedCardById(numericId);
  }

  //UNLOCK CARD HANDLERS
  @Post('/unlock')
  unlockCard(@Body('userId') userId: number, @Body('cardId') cardId: number) {
    return this.cardsService.unlockCard(userId, cardId);
  }

  @Get('/unlocked')
  getAllUserUnlockedCards(@Body('userId') userId: number) {
    return this.cardsService.findAllUserUnlockedCards(userId);
  }

  @Patch('/levelup/:id')
  levelUpUnblockedCard(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.cardsService.levelUpUnlockedCard(numericId);
  }
}
