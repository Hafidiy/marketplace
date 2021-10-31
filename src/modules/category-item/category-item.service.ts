import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDto } from '../common/models/query.dto';
import { CategoryItemDto } from './models/category_item.dto';
import { CategoryItemEntity } from './models/category_item.entity';
import {
  ICategoryItem,
  ICategoryItemPaginated,
} from './models/category_item.interface';

@Injectable()
export class CategoryItemService {
  constructor(
    @InjectRepository(CategoryItemEntity)
    private readonly categoryItemRepository: Repository<CategoryItemEntity>,
  ) {}

  async getCategoryItems(query?: QueryDto): Promise<ICategoryItemPaginated> {
    let { page, count } = query || {};

    if (page && typeof page === 'string') {
      page = parseInt(page);
    }

    if (count && typeof count === 'string') {
      count = parseInt(count);
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [category_items, total] =
      await this.categoryItemRepository.findAndCount({
        take: count,
        skip: (page - 1) * count,
      });

    return {
      category_items,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / count),
      },
    };
  }

  async createCategoryItem(
    data: CategoryItemDto,
  ): Promise<{ category_item: ICategoryItem }> {
    const { name, parent } = data;

    try {
      const newCategoryItem = await this.categoryItemRepository.save({
        name,
        parent,
      });
      return { category_item: newCategoryItem };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('CategoryItem already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCategoryItem(condition): Promise<{ category_item: ICategoryItem }> {
    const category_item = await this.categoryItemRepository.findOne(condition);

    if (!category_item) {
      throw new NotFoundException();
    }

    return { category_item };
  }

  async deleteCategoryItem(id: number): Promise<void> {
    const result = await this.categoryItemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateCategoryItem(
    id: number,
    data: CategoryItemDto,
  ): Promise<{ category_item: ICategoryItem }> {
    const { name } = data;

    const { category_item } = await this.getCategoryItem({ id });

    try {
      const updatedCategoryItem = await this.categoryItemRepository.save({
        ...category_item,
        name,
      });

      return { category_item: updatedCategoryItem };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('CategoryItem already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
