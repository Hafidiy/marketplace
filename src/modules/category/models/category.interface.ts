import { ICategoryItem } from 'src/modules/category-item/models/category_item.interface';
import { IPaginated } from 'src/modules/common/models/paginate.interface';

export interface ICategory {
  id: number;
  name: string;
  items: ICategoryItem[];
}

export interface ICategoryPaginated extends IPaginated {
  categories: ICategory[];
}
