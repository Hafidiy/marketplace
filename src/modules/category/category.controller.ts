import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDto } from './models/category.dto';
import { CategoryService } from './category.service';

@Controller('api/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategoriesTree();
  }

  @Post()
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body.name);
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    // return this.categoryService.getCategoryById(id);
    return this.categoryService.getCategory({ id });
  }

  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Put('/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryDto,
  ) {
    return this.categoryService.updateCategoryName(id, body.name);
  }

  @Post(':id')
  addCategoryChild(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryDto,
  ) {
    return this.categoryService.addCategoryChild(id, body.name);
  }
}
