import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createKillDto } from './dtos/create-kill.dto';
import { KillsService } from './kills.service';

@Controller('kills')
export class KillsController {
  constructor(private killService: KillsService) {}
  @Get('/match')
  getAllKillsByMatchId(@Body() body: { matchId: number; playerId: number }) {
    this.killService.findAllKillsByMatchId(body.matchId, body.playerId);
  }

  @Get('/date')
  getAllUserKillsByDate(
    @Body() body: { fromDate: Date; toDate: Date; playerId: number },
  ) {
    this.killService.findAllKillsByDate(
      body.fromDate,
      body.toDate,
      body.playerId,
    );
  }

  @Get('/card')
  getAllUserKillsByCard(@Body() body: { cardName: string; playerId: number }) {
    this.killService.findAllKillsByCardName(body.cardName, body.playerId);
  }

  @Get('/type')
  getAllUserKillsByType(@Body() body: { cardType: string; playerId: number }) {
    this.killService.findAllKillsByCardType(body.cardType, body.playerId);
  }

  @Post()
  createKill(@Body() body: createKillDto) {
    this.killService.createKill(body);
  }
}
