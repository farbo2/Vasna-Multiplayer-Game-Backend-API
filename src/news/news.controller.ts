import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('news')
export class NewsController {
  // NEWS HANDLERS
  @Get()
  getAllNews() {}

  @Get('/:id')
  getNewsById(@Param('id') id: number) {}

  @Get('/type/:type')
  getNewsByType(@Param('type') type: string) {}

  @Post()
  createNews(@Body() body: any) {}

  @Patch('/:id')
  updateNews(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  deleteNews(@Param('id') id: number) {}

  //NEWS STATUS
  @Post('/status')
  createNewsStatus(@Body() body: any) {}

  @Patch('/status/:id')
  updateNewsStatus(@Param('id') id: number, @Body() body: any) {}
}
