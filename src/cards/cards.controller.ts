import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import {
  Body,
  Req,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createCardDto } from './dtos/create-card.dto';
import { updateCardDto } from './dtos/update-card.dto';
import { CardsService } from './cards.service';
import { Request } from 'express';
import { AuthenticatedUser } from '../guards/jwt-auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}
  //CARD HANDLERS
  @Get()
  getAllCards() {
    return this.cardsService.findAllCards();
  }
  @UseGuards(AdminGuard)

  @Post()
  createCard(@Body() body: createCardDto) {
    return this.cardsService.createCard(body);
  }

  @UseGuards(AdminGuard)

  @Delete('/:id')
  removeCardById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.cardsService.deleteCard(numericId);
  }
  @UseGuards(AdminGuard)

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
    @Body('cardId', ParseIntPipe) cardId: number,
    @Req() req: Request & { user: AuthenticatedUser },
  ) {
    return this.cardsService.selectCardByUnlockedCardId(req.user.id, cardId);
  }

  @Get('/selected')
  getAllUserSelectedCards(@Req() req: Request & { user: AuthenticatedUser }) {
    return this.cardsService.getAllUserSelectedCards(req.user.id);
  }

  @Delete('/unselect/:id')
  unselectCardById(@Param('id') id: string, @Req() req: Request & { user: AuthenticatedUser }) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.cardsService.unselectUnlockedCardById(numericId, req.user.id);
  }

  //UNLOCK CARD HANDLERS
  @Post('/unlock')
  unlockCard(@Body('cardId', ParseIntPipe) cardId: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.cardsService.unlockCard(req.user.id, cardId);
  }

  @Get('/unlocked')
  getAllUserUnlockedCards(@Req() req: Request & { user: AuthenticatedUser }) {
    return this.cardsService.findAllUserUnlockedCards(req.user.id);
  }

  @Patch('/levelup/:id')
  levelUpUnblockedCard(@Param('id') id: string, @Req() req: Request & { user: AuthenticatedUser }) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.cardsService.levelUpUnlockedCard(numericId, req.user.id);
  }
  @Get('/:id')
  getCardById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.cardsService.findCardById(numericId);
  }
}
