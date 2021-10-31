import { IOrder } from "src/modules/order/models/order.interface";
import { IPaginated } from "src/modules/common/models/paginate.interface";

export interface IOrderItem {
    id: number;
    name: string;
    parent: IOrder;
}

export interface IOrderItemPaginated extends IPaginated {
    order_items: IOrderItem[];
}