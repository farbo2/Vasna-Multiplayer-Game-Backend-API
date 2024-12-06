import { Body, Controller, Get, Post } from '@nestjs/common';
import { createMoveDto } from './dtos/create-move.dto';
import { MovesService } from './moves.service';

@Controller('moves')
export class MovesController {
  constructor(private movesService: MovesService) {}
  @Post()
  createMove(@Body() body: createMoveDto) {
    this.movesService.createMove(body);
  }

  @Get('/type-date')
  getAllUserMovesByTypeAndDate(
    @Body()
    body: {
      userId: number;
      moveType: string;
      moveFromDate: Date;
      moveToDate: Date;
    },
  ) {
    this.getAllUserMovesByTypeAndDate(body);
  }
}
