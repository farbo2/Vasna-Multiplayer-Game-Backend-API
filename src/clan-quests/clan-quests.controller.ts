import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('clan-quests')
export class ClanQuestsController {
  //CLAN QUEST HANDLERS
  @Get('/:id')
  getClanQuestById(@Param('id') id: number) {}

  @Patch('/:id')
  updateClanQuest(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  removeClanQuest(@Param('id') id: number) {}

  @Post()
  createClanQuest(@Body() body: any) {
    //TODO: Add ClanQuestHistory and ClanQuestProgress for every single ClanQuest by 0 progress point
  }

  @Get('/clan/:clanid')
  getAllClanQuestByClanId(@Param('clanid') id: number) {}

  @Get('/clan/active/:clanid')
  getActiveClanQuestByClanId(@Param('clanid') id: number) {}

  //Clan Contribution
  @Patch('/clan/contrubution/:clanid')
  contributeClanQuestByClanId(@Param('id') id: number, @Body() body: any) {
    //TODO: Get All Game Statics and Get Current User And Active Quest
    //TODO: Update Contribution point and Current Clan Quest Point
    //TODO: Check For Quest Status After Contribution
  }
}
