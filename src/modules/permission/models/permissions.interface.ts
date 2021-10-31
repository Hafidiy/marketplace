import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IPermission {
    id: number;
    name: string;
}

export interface IPermissionPaginated extends IPaginated {
    permissions: IPermission[];
}