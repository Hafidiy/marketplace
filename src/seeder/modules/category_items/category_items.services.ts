import { Injectable } from "@nestjs/common";
import { CategoryItemService } from "src/modules/category-item/category-item.service";
import { ICategoryItem } from "src/modules/category-item/models/category_item.interface";
import { initialCategoryItems } from "src/seeder/data/category_items";

@Injectable()
export class CategoryItemSeederService {
  constructor(private categoryItemService: CategoryItemService) {}

  async create(): Promise<ICategoryItem[]> {
    const category_items: ICategoryItem[] = [];

    for (let i = 0; i < initialCategoryItems.length; i++) {
      // console.log('name: ', initialCategoryItems[i].name);
      try {
        // const { category_item } = await this.categoryItemService.createCategoryItem(
        //   initialCategoryItems[i],
        // );

        // // console.log('category_item: ', category_item);
        // category_items.push(category_item);
      } catch (err) {
        console.log('Error category_item service', err);
        Promise.reject(err);
      }
    }

    // console.log('category_items: ', category_items);
    return category_items;
  }
}
