import { IsNotEmpty } from "class-validator";
import { ICategory } from "src/modules/category/models/category.interface";

export class CategoryItemDto {
    @IsNotEmpty()
    name: string;

    parent: ICategory;
}