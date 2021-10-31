import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface ITransaction {
    id: number;
    name: string;
}

export interface ITransactionPaginated extends IPaginated {
    transactions: ITransaction[];
}