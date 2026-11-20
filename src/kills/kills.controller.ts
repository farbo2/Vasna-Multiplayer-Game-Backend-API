import { BadRequestException, Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from '../guards/jwt-auth/jwt-auth.guard';
import { createKillDto } from './dtos/create-kill.dto';
import { KillsService } from './kills.service';

@Controller('kills')
export class KillsController {
  constructor(private readonly killService: KillsService) {}

  @Get('/match')
  getAllKillsByMatchId(@Query('matchId') matchId: string, @Req() req: Request & { user: AuthenticatedUser }) {
    const id = Number(matchId);
    if (!Number.isSafeInteger(id) || id <= 0) throw new BadRequestException('Invalid matchId');
    return this.killService.findAllKillsByMatchId(id, req.user.id);
  }

  @Get('/date')
  getAllUserKillsByDate(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string, @Req() req: Request & { user: AuthenticatedUser }) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) throw new BadRequestException('Invalid date range');
    return this.killService.findAllKillsByDate(from, to, req.user.id);
  }

  @Get('/card')
  getAllUserKillsByCard(@Query('cardName') cardName: string, @Req() req: Request & { user: AuthenticatedUser }) {
    if (!cardName) throw new BadRequestException('cardName is required');
    return this.killService.findAllKillsByCardName(cardName, req.user.id);
  }

  @Get('/type')
  getAllUserKillsByType(@Query('cardType') cardType: string, @Req() req: Request & { user: AuthenticatedUser }) {
    if (!cardType) throw new BadRequestException('cardType is required');
    return this.killService.findAllKillsByCardType(cardType, req.user.id);
  }

  @Post()
  createKill(@Body() body: createKillDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.killService.createKill({ ...body, playerId: req.user.id });
  }
}
