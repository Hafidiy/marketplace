import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryDto } from "../common/models/query.dto";
import { OrderItemService } from "../order-item/order-item.service";
import { OrderDto } from "./models/order.dto";
import { OrderEntity } from "./models/order.entity";
import { IOrder, IOrderPaginated } from "./models/order.interface";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private orderItemService: OrderItemService,
  ) {}

  async getOrders(query?: QueryDto): Promise<IOrderPaginated> {
    let { page, count } = query || {};

    if (page && typeof page === 'string') {
      page = parseInt(page);
    }

    if (count && typeof count === 'string') {
      count = parseInt(count);
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [orders, total] = await this.orderRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return {
      orders,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / count),
      },
    };
  }

  async createOrder(data: OrderDto) {
    const { name, items } = data;

    let order;

    try {
      order = await this.orderRepository.save({ name });
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Order already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    for (let i = 0; i < items.length; i++) {
      await this.orderItemService.createOrderItem({
        name: items[i],
        parent: order,
      });
    }

    return { order };
  }

  async getOrder(condition): Promise<{ order: IOrder }> {
    const order = await this.orderRepository.findOne(condition);

    if (!order) {
      throw new NotFoundException();
    }

    return { order };
  }

  async deleteOrder(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateOrder(
    id: number,
    data: OrderDto,
  ): Promise<{ order: IOrder }> {
    const { name, items } = data;

    const { order } = await this.getOrder({ id });

    let sameItems = [];

    items.map((e) => {
      order.items.map((ee) => {
        if (e === ee.name) {
          sameItems.push(e);
        }
      });
    });

    let deleteItems = order.items.filter(e => !sameItems.some(ee => e.name === ee));
    let newItems = items.filter(e => !sameItems.some(ee => e === ee));

    for (let i = 0; i < deleteItems.length; i++) {
      await this.orderItemService.deleteOrderItem(deleteItems[i].id);
    }
    delete order.items;

    for (let i = 0; i < newItems.length; i++) {
      await this.orderItemService.createOrderItem({
        name: newItems[i],
        parent: order,
      });
    }

    try {
      const updatedOrder = await this.orderRepository.save({
        ...order,
        name,
      });

      return { order: updatedOrder };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Order already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
