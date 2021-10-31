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
import { CategoryService } from './category.service';
import { CategoryDto } from './models/category.dto';
import { ICategory } from './models/category.interface';

@Controller('api/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(
    @Query() queryDto: QueryDto,
  ): Promise<{ categories: ICategory[] }> {
    return this.categoryService.getCategories(queryDto);
  }

  @Post()
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Get('/:id')
  getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ category: ICategory }> {
    return this.categoryService.getCategory({ id });
  }

  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }

  @Put('/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryDto,
  ): Promise<{ category: ICategory }> {
    return this.categoryService.updateCategory(id, body);
  }
}
