import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { MovesRepository } from './moves.repository';
import { Move } from './entities/move.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Move])],
  providers: [MovesService, MovesRepository],
  controllers: [MovesController],
})
export class MovesModule {}
