import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('cards')
export class CardsController {
  //CARD HANDLERS
  @Get()
  getAllCards() {}

  @Post()
  CreateCard(@Body() body: any) {}

  @Get('/:id')
  getCardById(@Param('id') id: number) {}

  @Delete('/:id')
  removetCardById(@Param('id') id: number) {}

  @Patch('/:id')
  UpdateCardById(@Param('id') id: number, @Body() body: any) {}

  @Get('/available')
  getAllAvailableCards() {}

  @Get('/type/:type')
  getCardsByType(@Param('type') type: string) {}

  //SELECTED CARDS HANDLER
  @Post('/select')
  selectCardById(@Param('id') id: number, @Body() body: any) {}

  @Get('/selected')
  getAllUserSelectedCards(@Body() body: any) {}

  @Delete('/unselect')
  unselectCardById(@Param('id') id: number, @Body() body: any) {}

  //UNLOCK CARD HANDLERS
  @Post('/unlock')
  unlockCard(@Param('id') id: number, @Body() body: any) {}

  @Get('/unlocked')
  getAllUnlockedCards(@Body() body: any) {}

  @Patch('/levelup')
  levelUpCard(@Param('id') id: number, @Body() body: any) {}
}
