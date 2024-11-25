import { Module } from '@nestjs/common';
import { PrivateMessagesService } from './private-messages.service';
import { PrivateMessagesController } from './private-messages.controller';

@Module({
  providers: [PrivateMessagesService],
  controllers: [PrivateMessagesController]
})
export class PrivateMessagesModule {}
