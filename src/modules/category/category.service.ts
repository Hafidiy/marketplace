import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryItemService } from '../category-item/category-item.service';
import { QueryDto } from '../common/models/query.dto';
import { CategoryDto } from './models/category.dto';
import { CategoryEntity } from './models/category.entity';
import { ICategory, ICategoryPaginated } from './models/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private categoryItemService: CategoryItemService,
  ) {}

  async getCategories(query?: QueryDto): Promise<ICategoryPaginated> {
    let { page, count } = query || {};

    if (page && typeof page === 'string') {
      page = parseInt(page);
    }

    if (count && typeof count === 'string') {
      count = parseInt(count);
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [categories, total] = await this.categoryRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return {
      categories,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / count),
      },
    };
  }

  async createCategory(data: CategoryDto) {
    const { name, items } = data;

    let category;

    try {
      category = await this.categoryRepository.save({ name });
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Category already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    for (let i = 0; i < items.length; i++) {
      await this.categoryItemService.createCategoryItem({
        name: items[i],
        parent: category,
      });
    }

    return { category };
  }

  async getCategory(condition): Promise<{ category: ICategory }> {
    const category = await this.categoryRepository.findOne(condition);

    if (!category) {
      throw new NotFoundException();
    }

    return { category };
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateCategory(
    id: number,
    data: CategoryDto,
  ): Promise<{ category: ICategory }> {
    const { name, items } = data;

    const { category } = await this.getCategory({ id });

    let sameItems = [];

    items.map((e) => {
      category.items.map((ee) => {
        if (e === ee.name) {
          sameItems.push(e);
        }
      });
    });

    let deleteItems = category.items.filter(e => !sameItems.some(ee => e.name === ee));
    let newItems = items.filter(e => !sameItems.some(ee => e === ee));

    for (let i = 0; i < deleteItems.length; i++) {
      await this.categoryItemService.deleteCategoryItem(deleteItems[i].id);
    }
    delete category.items;

    for (let i = 0; i < newItems.length; i++) {
      await this.categoryItemService.createCategoryItem({
        name: newItems[i],
        parent: category,
      });
    }

    try {
      const updatedCategory = await this.categoryRepository.save({
        ...category,
        name,
      });

      return { category: updatedCategory };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Category already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
