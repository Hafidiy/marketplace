import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IShop {
    name: string;
}

export interface IShopPaginated extends IPaginated {
    shops: IShop[];
}