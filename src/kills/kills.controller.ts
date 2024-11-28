import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('kills')
export class KillsController {
  @Get()
  getAllKillsByMatchId(@Param('matchid') matchId: number) {}

  @Get('/date')
  getAllUserKillsByDate(@Body() body: any) {}

  @Get('/card')
  getAllUserKillsByCard(@Body() body: any) {}

  @Get('/type')
  getAllUserKillsByType(@Body() body: any) {}

  @Post()
  createKill(@Body() body: any) {}
}
