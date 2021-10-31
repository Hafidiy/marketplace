import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    salt: string;
    password: string;
}

export interface IUserPaginated extends IPaginated {
    users: IUser[];
}