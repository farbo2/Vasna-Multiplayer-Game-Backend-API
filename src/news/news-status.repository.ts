import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { NewsStatus } from './entities/news-status.entity';

@Injectable()
export class NewsStatusRepository extends Repository<NewsStatus> {
  async findNewsStatusById(id: number): Promise<NewsStatus> {
    return this.findOne({ where: { id: id } });
  }

  async updateNewsStatus(
    id: number,
    updateData: Partial<NewsStatus>,
  ): Promise<NewsStatus> {
    // Find News Status
    const newsStatus = await this.findOne({ where: { id } });
    if (!newsStatus) {
      throw new Error(`News Status with ID ${id} not found`);
    }
    // update News Status
    Object.assign(newsStatus, updateData);

    // Save to Database
    return this.save(newsStatus);
  }
}
