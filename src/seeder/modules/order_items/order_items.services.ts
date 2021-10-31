import { Injectable } from "@nestjs/common";
import { IOrderItem } from "src/modules/order-item/models/order_item.interface";
import { OrderItemService } from "src/modules/order-item/order-item.service";
import { initialOrderItems } from "src/seeder/data/order_items";

@Injectable()
export class OrderItemSeederService {
  constructor(private orderItemService: OrderItemService) {}

  async create(): Promise<IOrderItem[]> {
    const order_items: IOrderItem[] = [];

    for (let i = 0; i < initialOrderItems.length; i++) {
      // console.log('name: ', initialOrderItems[i].name);
      try {
        // const { order_item } = await this.orderItemService.createOrderItem(
        //   initialOrderItems[i],
        // );

        // // console.log('order_item: ', order_item);
        // order_items.push(order_item);
      } catch (err) {
        console.log('Error order_item service', err);
        Promise.reject(err);
      }
    }

    // console.log('order_items: ', order_items);
    return order_items;
  }
}
