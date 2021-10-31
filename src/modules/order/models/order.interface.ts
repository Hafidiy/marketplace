import { IPaginated } from 'src/modules/common/models/paginate.interface';
import { IOrderItem } from 'src/modules/order-item/models/order_item.interface';

export interface IOrder {
  id: number;
  name: string;
  items: IOrderItem[];
}

export interface IOrderPaginated extends IPaginated {
  orders: IOrder[];
}
