import { Module } from '@nestjs/common';
import { KillsService } from './kills.service';
import { KillsController } from './kills.controller';
import { KillsRepository } from './kills.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kill } from './entities/kill.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Kill])],
  providers: [KillsService, KillsRepository, JwtAuthGuard],
  controllers: [KillsController],
})
export class KillsModule {}
