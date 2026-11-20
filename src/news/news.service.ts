import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { createNewsDto } from './dtos/create-news.dto';
import { createNewsStatusDto } from './dtos/create-news-status.dto';
import { NewsStatusRepository } from './news-status.repository';
import { updateNewsDto } from './dtos/update-news.dto';
import { updateNewsStatusDto } from './dtos/update-news-status.dto';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  constructor(
    private newsRepo: NewsRepository,
    private newsStatusRepo: NewsStatusRepository,
  ) {}

  async createNews(data: createNewsDto) {
    const news = this.newsRepo.create(data);

    return this.newsRepo.save(news);
  }

  async findAllNewsByType(type: string) {
    try {
      this.logger.log('Attempting to fetch a News by Type');
      const news = await this.newsRepo.findNewsByType(type);
      if (!news) {
        this.logger.warn('No News record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched News with Type ${type}`);
      return news;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching News by Type',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving News data. Please try again later',
      );
    }
  }
  async findNewsById(id: number) {
    try {
      this.logger.log('Attempting to fetch a News by Id');
      const news = await this.newsRepo.findNewsById(id);
      if (!news) {
        this.logger.warn('No News record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched News with ID ${id}`);
      return news;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching News by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving News data. Please try again later',
      );
    }
  }

  async findAllNews() {
    try {
      this.logger.log('Attempting to fetch a News');
      const news = await this.newsRepo.findAllNews();
      if (!news) {
        this.logger.warn('No News record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched News`);
      return news;
    } catch (error) {
      this.logger.error('Error occurred while fetching News', error.stack);
      throw new InternalServerErrorException(
        'An error occurred while retrieving News data. Please try again later',
      );
    }
  }
  async deleteNews(newsId: number) {
    this.newsRepo.deleteNews(newsId);
  }

  async updateNews(newsId: number, updateData: updateNewsDto) {
    this.newsRepo.updateNews(newsId, updateData);
    return { message: 'News Updated' };
  }

  //NEWS STATUS HANDLERS
  async createNewsStatus(data: createNewsStatusDto) {
    const newsStatus = this.newsStatusRepo.create(data);

    return this.newsStatusRepo.save(newsStatus);
  }

  async findNewsStatusById(id: number) {
    try {
      this.logger.log('Attempting to fetch a News Status by Id');
      const newsStatus = await this.newsStatusRepo.findNewsStatusById(id);
      if (!newsStatus) {
        this.logger.warn('No News Status record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched News Status with ID ${id}`);
      return newsStatus;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching News Status by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving News Status data. Please try again later',
      );
    }
  }

  async updateNewsStatus(
    newsStatusId: number,
    updateData: updateNewsStatusDto,
  ) {
    this.newsStatusRepo.updateNewsStatus(newsStatusId, updateData);
    return { message: 'News Status Updated' };
  }
}
