import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDto } from '../common/models/query.dto';
import { OrderItemDto } from './models/order_item.dto';
import { OrderItemEntity } from './models/order_item.entity';
import { IOrderItem, IOrderItemPaginated } from './models/order_item.interface';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async getOrderItems(query?: QueryDto): Promise<IOrderItemPaginated> {
    let { page, count } = query || {};

    if (page && typeof page === 'string') {
      page = parseInt(page);
    }

    if (count && typeof count === 'string') {
      count = parseInt(count);
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [order_items, total] = await this.orderItemRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return {
      order_items,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / count),
      },
    };
  }

  async createOrderItem(
    data: OrderItemDto,
  ): Promise<{ order_item: IOrderItem }> {
    const { name, parent } = data;

    try {
      const newOrderItem = await this.orderItemRepository.save({
        name,
        parent,
      });
      return { order_item: newOrderItem };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('OrderItem already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getOrderItem(condition): Promise<{ order_item: IOrderItem }> {
    const order_item = await this.orderItemRepository.findOne(condition);

    if (!order_item) {
      throw new NotFoundException();
    }

    return { order_item };
  }

  async deleteOrderItem(id: number): Promise<void> {
    const result = await this.orderItemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateOrderItem(
    id: number,
    data: OrderItemDto,
  ): Promise<{ order_item: IOrderItem }> {
    const { name } = data;

    const { order_item } = await this.getOrderItem({ id });

    try {
      const updatedOrderItem = await this.orderItemRepository.save({
        ...order_item,
        name,
      });

      return { order_item: updatedOrderItem };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('OrderItem already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
