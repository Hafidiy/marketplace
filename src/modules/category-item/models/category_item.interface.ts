import { ICategory } from "src/modules/category/models/category.interface";
import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface ICategoryItem {
    id: number;
    name: string;
    parent: ICategory;
}

export interface ICategoryItemPaginated extends IPaginated {
    category_items: ICategoryItem[];
}