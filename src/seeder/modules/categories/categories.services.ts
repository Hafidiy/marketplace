import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { ICategory } from 'src/modules/category/models/category.interface';
import { initialCategories } from 'src/seeder/data/categories';

@Injectable()
export class CategorySeederService {
  constructor(private categoryService: CategoryService) {}

  async create(): Promise<ICategory[]> {
    const categories: ICategory[] = [];

    for (let i = 0; i < initialCategories.length; i++) {
      // console.log('name: ', initialCategories[i].name);
      try {
        // const { category } = await this.categoryService.createCategory(
        //   initialCategories[i],
        // );

        // // console.log('category: ', category);
        // categories.push(category);
      } catch (err) {
        console.log('Error category service', err);
        Promise.reject(err);
      }
    }

    // console.log('categories: ', categories);
    return categories;
  }
}
