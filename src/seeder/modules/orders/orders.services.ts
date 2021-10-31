import { Injectable } from "@nestjs/common";
import { IOrder } from "src/modules/order/models/order.interface";
import { OrderService } from "src/modules/order/order.service";
import { initialOrders } from "src/seeder/data/orders";

@Injectable()
export class OrderSeederService {
  constructor(private orderService: OrderService) {}

  async create(): Promise<IOrder[]> {
    const orders: IOrder[] = [];

    for (let i = 0; i < initialOrders.length; i++) {
      // console.log('name: ', initialOrders[i].name);
      try {
        // const { order } = await this.orderService.createOrder(
        //   initialOrders[i],
        // );

        // // console.log('order: ', order);
        // orders.push(order);
      } catch (err) {
        console.log('Error order service', err);
        Promise.reject(err);
      }
    }

    // console.log('orders: ', orders);
    return orders;
  }
}
