import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('moves')
export class MovesController {
  @Post()
  createMove(@Body() body: any) {}

  @Get('/type-date')
  getAllMoveByTypeAndDate(@Body() body: any) {}
}
