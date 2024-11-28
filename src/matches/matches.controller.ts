import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('matches')
export class MatchesController {
  @Post()
  createMatch(@Body() body: any) {}

  @Get()
  getMatchById(@Param('id') id: number) {}

  @Patch()
  updateMatchById(@Param('id') id: number) {}

  @Get('/winner/:userId')
  getMatchWinsByUserId(@Param('userId') id: number, @Body() body: any) {}
}
