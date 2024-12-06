import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsStatus } from './entities/news-status.entity';
import { NewsStatusRepository } from './news-status.repository';

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsStatus])],
  providers: [NewsService, NewsRepository, NewsStatusRepository],
  controllers: [NewsController],
})
export class NewsModule {}
