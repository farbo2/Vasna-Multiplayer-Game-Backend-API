import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { MovesRepository } from './moves.repository';
import { Move } from './entities/move.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Move])],
  providers: [MovesService, MovesRepository, JwtAuthGuard],
  controllers: [MovesController],
})
export class MovesModule {}
