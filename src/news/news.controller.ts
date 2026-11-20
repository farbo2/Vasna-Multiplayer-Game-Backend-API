import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { updateNewsDto } from './dtos/update-news.dto';
import { createNewsStatusDto } from './dtos/create-news-status.dto';
import { updateNewsStatusDto } from './dtos/update-news-status.dto';
import { createNewsDto } from './dtos/create-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  // NEWS HANDLERS
  @Get()
  getAllNews() {
    return this.newsService.findAllNews();
  }

  @Get('/:id')
  getNewsById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.newsService.findNewsById(numericId);
  }

  @Get('/type/:type')
  getNewsByType(@Param('type') type: string) {
    return this.newsService.findAllNewsByType(type);
  }
  @UseGuards(AdminGuard)

  @Post()
  createNews(@Body() body: createNewsDto) {
    return this.newsService.createNews(body);
  }
  @UseGuards(AdminGuard)

  @Patch('/:id')
  updateNews(@Param('id') id: string, @Body() body: updateNewsDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.newsService.updateNews(numericId, body);
  }
  @UseGuards(AdminGuard)

  @Delete('/:id')
  deleteNews(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.newsService.deleteNews(numericId);
  }

  //NEWS STATUS
  @Get('status/:id')
  getNewsStatusById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.newsService.findNewsStatusById(numericId);
  }
  @UseGuards(AdminGuard)

  @Post('/status')
  createNewsStatus(@Body() body: createNewsStatusDto) {
    return this.newsService.createNewsStatus(body);
  }
  @UseGuards(AdminGuard)

  @Patch('/status/:id')
  updateNewsStatus(@Param('id') id: string, @Body() body: updateNewsStatusDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.newsService.updateNewsStatus(numericId, body);
  }
}
