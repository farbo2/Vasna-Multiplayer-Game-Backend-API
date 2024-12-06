import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';

@Injectable()
export class NewsRepository extends Repository<News> {
  async findAllNews(): Promise<News[]> {
    return this.find();
  }

  async findNewsById(id: number): Promise<News> {
    return this.findOne({ where: { id: id } });
  }

  async findNewsByType(type: string): Promise<News[]> {
    return this.find({ where: { type } });
  }

  async updateNews(id: number, updateData: Partial<News>): Promise<News> {
    // Find News
    const news = await this.findOne({ where: { id } });
    if (!news) {
      throw new Error(`News with ID ${id} not found`);
    }
    // update News
    Object.assign(news, updateData);

    // Save to Database
    return this.save(news);
  }

  async deleteNews(id: number): Promise<void> {
    // Check if News Exists
    const news = await this.findOne({
      where: { id },
    });
    if (!news) {
      throw new Error(`News with ID ${id} not found`);
    }
    // Remove News
    await this.remove(news);
  }
}
