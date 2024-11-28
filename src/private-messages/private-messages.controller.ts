import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

@Controller('private-messages')
export class PrivateMessagesController {
  @Get()
  getAllMessagesBySenderAndReciever(@Body() body: any) {}

  @Get('/sender/:id')
  getAllMessagesBySenderId(@Param('id') id: number) {}

  @Get('/reciever/:id')
  getAllMessagesByRecieverId(@Param('id') id: number) {}

  @Patch('/edit/:id')
  editMessageById(@Param('id') id: number) {}

  @Patch('/seen/:id')
  seenMessageById(@Param('id') id: number) {}

  @Delete('/:id')
  deleteMessageById(@Param('id') id: number) {}
}
