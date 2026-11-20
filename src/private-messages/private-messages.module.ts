import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { PrivateMessage } from './entities/private-message.entity';
import { PrivateMessagesController } from './private-messages.controller';
import { PrivateMessagesService } from './private-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateMessage])],
  providers: [PrivateMessagesService, JwtAuthGuard],
  controllers: [PrivateMessagesController],
})
export class PrivateMessagesModule {}
