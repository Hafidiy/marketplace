import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryDto } from '../common/models/query.dto';
import { CategoryItemService } from './category-item.service';
import { CategoryItemDto } from './models/category_item.dto';
import { ICategoryItem } from './models/category_item.interface';

@Controller('api/category_items')
export class CategoryItemController {
  constructor(private categoryItemService: CategoryItemService) {}

  @Get()
  getCategoryItems(
    @Query() queryDto: QueryDto,
  ): Promise<{ category_items: ICategoryItem[] }> {
    return this.categoryItemService.getCategoryItems(queryDto);
  }

  @Post()
  createCategoryItem(
    @Body() body: CategoryItemDto,
  ): Promise<{ category_item: ICategoryItem }> {
    return this.categoryItemService.createCategoryItem(body);
  }

  @Get('/:id')
  getCategoryItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ category_item: ICategoryItem }> {
    return this.categoryItemService.getCategoryItem({ id });
  }

  @Delete('/:id')
  deleteCategoryItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryItemService.deleteCategoryItem(id);
  }

  @Put('/:id')
  updateCategoryItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryItemDto,
  ): Promise<{ category_item: ICategoryItem }> {
    return this.categoryItemService.updateCategoryItem(id, body);
  }
}
