import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IBrand {
    id: number;
    name: string;
}

export interface IBrandPaginated extends IPaginated {
    brands: IBrand[];
}