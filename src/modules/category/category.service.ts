import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, TreeRepository } from 'typeorm';
import { Category } from './models/category.entity';

@Injectable()
export class CategoryService {
  manager = getManager();

  constructor(
    @InjectRepository(Category)
    private readonly categoryTreeRepository: TreeRepository<Category>,
  ) {}

  async getCategoriesTree(): Promise<{ categories: Category[] }> {
    const categories = (
      await this.categoryTreeRepository.findTrees({
        relations: ['characteristics', 'characteristics.values'],
      })
    ).sort((a, b) => a.id - b.id);

    return { categories };
  }

  async createCategory(name: string): Promise<{ category: Category }> {
    const category = new Category();
    category.name = name;
    const result = await this.manager.save(category);

    return { category: result };
  }

  async getCategory(condition) {
    const category = await this.categoryTreeRepository.findOne(condition, {
      relations: ['characteristics', 'characteristics.values'],
    });

    if (!category) {
      throw new NotFoundException();
    }

    await this.categoryTreeRepository.findDescendantsTree(category);
    await this.categoryTreeRepository.findAncestorsTree(category);

    return { category };
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryTreeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateCategoryName(id: number, name: string) {
    const { category } = await this.getCategory({ id });

    category.name = name;
    const result = await this.manager.save(category);

    return { category: result };
  }

  async addCategoryChild(id: number, name: string) {
    const { category } = await this.getCategory({ id });

    const child_category = new Category();
    child_category.name = name;
    child_category.parent = category;
    const result = await this.manager.save(child_category);

    return { category: result };
  }

  async getCategoryById(id: number): Promise<{ category: Category }> {
    const { categories } = await this.getCategoriesTree();

    for (let i = 0; i < categories.length; i++) {
      const result = await this.findCategoryFromArray(id, categories[i]);
      if (result) {
        return { category: result };
      }
    }

    throw new NotFoundException();
  }

  async findCategoryFromArray(id: number, residue: Category) {
    if (residue.id === id) {
      return residue;
    }

    for (let i = 0; i < residue.children.length; i++) {
      const result = await this.findCategoryFromArray(id, residue.children[i]);
      if (result) {
        return result;
      }
    }

    return null;
  }
}
