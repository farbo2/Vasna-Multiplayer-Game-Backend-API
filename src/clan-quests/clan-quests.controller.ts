import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClanQuestsService } from './clan-quests.service';
import { updateClanQuestDto } from './dtos/update-clan-quest.dto';
import { createClanQuestDto } from './dtos/create-clan-quest.dto';
import { updateCurrentClanQuestDto } from './dtos/update-current-clan-quest.dto';

@Controller('clan-quests')
export class ClanQuestsController {
  constructor(private clanQuestService: ClanQuestsService) {}
  //CLAN QUEST HANDLERS

  //ADMINSTRATIN SECTION

  @Get()
  getAllClanQuests() {
    return this.clanQuestService.findAllClanQuests();
  }

  @Get('/:id')
  getClanQuestById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clanQuestService.findClanQuestById(numericId);
  }

  @Patch('/:id')
  updateClanQuestById(
    @Param('id') id: string,
    @Body() body: updateClanQuestDto,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clanQuestService.updateClanQuest(numericId, body);
  }

  @Delete('/:id')
  removeClanQuest(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clanQuestService.deleteClanQuest(numericId);
  }

  @Post()
  createClanQuest(@Body() body: createClanQuestDto) {
    return this.clanQuestService.createClanQuest(body);
  }

  // CLAN LEADER AREA
  @Get('/clan/deactive/:clanid')
  getAllPrevCurrentClanQuestByClanId(@Param('clanid') clanId: string) {
    const numericId = parseInt(clanId, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clanQuestService.findAllDectiveClanQuestByClanId(numericId);
  }

  @Get('/clan/active/:clanid')
  getActiveCurrentClanQuestByClanId(@Param('clanid') clanId: string) {
    const numericId = parseInt(clanId, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clanQuestService.findActiveClanQuestByClanId(numericId);
  }

  @Patch('/:id')
  updateActiveCurrentClanQuestById(
    @Param('id') clanId: string,
    @Body() body: updateCurrentClanQuestDto,
  ) {
    const numericId = parseInt(clanId, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.clanQuestService.updateCurrentActiveClanQuest(numericId, body);
  }
  //CLAN MEMBER AREA

  //Clan Contribution
  @Patch('/clan/contrubution/:clanid')
  contributeClanQuestByClanId(@Param('id') id: number, @Body() body: any) {
    //TODO: Get All Game Statics and Get Current User And Active Quest
    //TODO: Update Contribution point and Current Clan Quest Point
    //TODO: Check For Quest Status After Contribution
  }
}

// STRATEGY : بايد با ساخت هر کلن یک کارنت کلن کوعست با وضعيت اكتيو ساخته بشه که وضعیت کوعست فعلی رو نگه میداره. به ازای هر کلن یکی هست و با تموم شدن کوعست دوباره ریفرش میشه. و کارنت کلن کوعست انجام شده یا منقضی شده تبدیل به کلن کوعست دی اکتیو میشه و دوباره براش یک ریکورد ایجاد میشه با وضعیت دی اکتیو..
