import { Module } from '@nestjs/common';
import { PrivateMessagesService } from './private-messages.service';
import { PrivateMessagesController } from './private-messages.controller';
import { PrivateMessagesRepository } from './private-messages.repository';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  providers: [PrivateMessagesService, PrivateMessagesRepository, JwtAuthGuard],
  controllers: [PrivateMessagesController],
})
export class PrivateMessagesModule {}
