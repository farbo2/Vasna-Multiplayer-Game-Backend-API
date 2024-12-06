import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Move } from './entities/move.entity';

@Injectable()
export class MovesRepository extends Repository<Move> {}
