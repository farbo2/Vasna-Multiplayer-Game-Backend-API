import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { createMatchDto } from './dtos/create-match.dto';
import { updateMatchDto } from './dtos/update-match.dto';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private matchService: MatchesService) {}
  @Post()
  createMatch(@Body() body: createMatchDto) {
    return this.matchService.createMatch(body);
  }

  @Get(':id')
  getMatchById(@Param('id') id: number) {
    return this.matchService.findMatchById(id);
  }

  @Patch(':id')
  updateMatchById(@Param('id') id: string, @Body() body: updateMatchDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.matchService.updateMatch(numericId, body);
  }

  @Get('/winner/:userId')
  getMatchWinsByUserId(@Param('userId') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.matchService.findAllWinsMatchByUserId(numericId);
  }
}
