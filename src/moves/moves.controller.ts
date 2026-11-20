import { BadRequestException, Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { createMoveDto } from './dtos/create-move.dto';
import { MovesService } from './moves.service';
import { JwtAuthGuard, AuthenticatedUser } from '../guards/jwt-auth/jwt-auth.guard';

@Controller('moves')
@UseGuards(JwtAuthGuard)
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Post()
  createMove(@Body() body: createMoveDto, @Req() request: Request & { user: AuthenticatedUser }) {
    return this.movesService.createMove({ ...body, playerId: request.user.id });
  }

  @Get('/type-date')
  getAllUserMovesByTypeAndDate(
    @Query('moveType') moveType: string,
    @Query('moveFromDate') fromDate: string,
    @Query('moveToDate') toDate: string,
    @Req() request: Request & { user: AuthenticatedUser },
  ) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (!moveType || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
      throw new BadRequestException('moveType and a valid date range are required');
    }
    return this.movesService.findAllUserMovesByTypeAndDate(request.user.id, moveType, start, end);
  }
}
