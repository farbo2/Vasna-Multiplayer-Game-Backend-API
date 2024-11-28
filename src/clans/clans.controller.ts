import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('clans')
export class ClansController {
  //CLAN HANDLERS
  @Get()
  getAllClans() {}

  @Post()
  createClan(@Body() body: any) {}

  @Patch('/:id')
  updateClan(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  deleteClan(@Param('id') id: number) {}

  // CLAN REQUEST HANDLERS
  @Get('/request/sender/:id')
  getAllClanRequestsBySenderId(@Param('id') id: number) {}

  @Get('/request/clan/:id')
  getAllClanRequestsByClanId(@Param('id') id: number) {}

  @Get('/request/:id')
  getClanRequestById(@Param('id') id: number) {}

  @Post('/request')
  sendClanRequest(@Body() body: any) {}

  @Delete('/request/:id')
  cancelClanRequest(@Param('id') id: number) {}

  @Patch('/request/:id')
  responseClanRequest(@Param('id') id: number, @Body() body: any) {}

  //CLAN INVITATION HANDLERS
  @Get('/invite/sender/:id')
  getAllClanInvitationsBySenderId(@Param('id') id: number) {}

  @Get('/invite/reciever/:id')
  getAllClanInvitationsByRecieverId(@Param('id') id: number) {}

  @Get('/invite/clan/:id')
  getAllClanInvitationsByClanId(@Param('id') id: number) {}

  @Get('/invite/:id')
  getClanInvitationById(@Param('id') id: number) {}

  @Post('/invvite')
  sendClanInvitation(@Body() body: any) {}
}
