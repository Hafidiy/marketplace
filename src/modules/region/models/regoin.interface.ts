import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IRegion {
    id: number;
    name: string;
}

export interface IRegionPaginated extends IPaginated {
    regions: IRegion[];
}