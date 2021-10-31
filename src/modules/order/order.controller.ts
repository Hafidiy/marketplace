import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryDto } from '../common/models/query.dto';
import { OrderDto } from './models/order.dto';
import { IOrder } from './models/order.interface';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders(@Query() queryDto: QueryDto): Promise<{ orders: IOrder[] }> {
    return this.orderService.getOrders(queryDto);
  }

  @Post()
  createOrder(@Body() body: OrderDto): Promise<{ order: IOrder }> {
    return this.orderService.createOrder(body);
  }

  @Get('/:id')
  getOrderById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ order: IOrder }> {
    return this.orderService.getOrder({ id });
  }

  @Delete('/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }

  @Put('/:id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: OrderDto,
  ): Promise<{ order: IOrder }> {
    return this.orderService.updateOrder(id, body);
  }
}
