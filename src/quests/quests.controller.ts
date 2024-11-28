import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('quests')
export class QuestsController {
  // QUEST HANDLERS
  @Get()
  getAllQuests() {}

  @Get()
  getActiveQuest() {}

  @Post()
  createQuest(@Body() body: any) {}

  @Patch('/:id')
  updateQuest(@Param('id') id: number, @Body() body: any) {}

  // USER QUEST HANDLERS
  @Post('/user-quest')
  createUserQuest(@Body() body: any) {}

  @Patch('/user-quest/:id')
  updateUserQuest(@Param('id') id: number, @Body() body: any) {}

  @Get('/user-quest/:id')
  getUserQuestById(@Param('id') id: number) {}

  @Get('/user-quest/user/:id')
  getActiveUserQuestByUserId(@Param('id') id: number, @Body() body: any) {}
}
