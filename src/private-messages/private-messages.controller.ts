import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Request } from 'express';
import { AuthenticatedUser, JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { PrivateMessagesService } from './private-messages.service';

class CreatePrivateMessageDto {
  @IsInt() @Min(1) receiverId: number;
  @IsString() @IsNotEmpty() @MaxLength(5000) message: string;
}
class EditPrivateMessageDto {
  @IsString() @IsNotEmpty() @MaxLength(5000) message: string;
}

@Controller('private-messages')
@UseGuards(JwtAuthGuard)
export class PrivateMessagesController {
  constructor(private readonly messagesService: PrivateMessagesService) {}

  @Get()
  getConversation(@Query('otherUserId', ParseIntPipe) otherUserId: number, @Req() req: Request & { user: AuthenticatedUser }) {
    if (otherUserId === req.user.id) throw new ForbiddenException('Invalid conversation participant');
    return this.messagesService.getConversation(req.user.id, otherUserId);
  }

  @Get('sender/:id')
  getAllMessagesBySenderId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.messagesService.getBySender(id, req.user.id);
  }

  @Get(['receiver/:id', 'reciever/:id'])
  getAllMessagesByReceiverId(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.messagesService.getByReceiver(id, req.user.id);
  }

  @Post()
  createMessage(@Body() body: CreatePrivateMessageDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.messagesService.create(req.user.id, body.receiverId, body.message);
  }

  @Patch('edit/:id')
  editMessageById(@Param('id', ParseIntPipe) id: number, @Body() body: EditPrivateMessageDto, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.messagesService.edit(id, req.user.id, body.message);
  }

  @Patch('seen/:id')
  seenMessageById(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.messagesService.markSeen(id, req.user.id);
  }

  @Delete(':id')
  deleteMessageById(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { user: AuthenticatedUser }) {
    return this.messagesService.remove(id, req.user.id);
  }
}
