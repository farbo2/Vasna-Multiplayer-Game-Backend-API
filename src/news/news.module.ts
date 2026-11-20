import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsStatus } from './entities/news-status.entity';
import { NewsStatusRepository } from './news-status.repository';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsStatus])],
  providers: [AdminGuard, NewsService, NewsRepository, NewsStatusRepository, JwtAuthGuard],
  controllers: [NewsController],
})
export class NewsModule {}
