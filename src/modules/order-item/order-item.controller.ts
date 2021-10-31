import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { QueryDto } from "../common/models/query.dto";
import { OrderItemDto } from "./models/order_item.dto";
import { IOrderItem } from "./models/order_item.interface";
import { OrderItemService } from "./order-item.service";

@Controller('api/order_items')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  getOrderItems(
    @Query() queryDto: QueryDto
  ): Promise<{ order_items: IOrderItem[] }> {
    return this.orderItemService.getOrderItems(queryDto);
  }

  @Post()
  createOrderItem(@Body() body: OrderItemDto): Promise<{ order_item: IOrderItem }> {
    return this.orderItemService.createOrderItem(body);
  }

  @Get('/:id')
  getOrderItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ order_item: IOrderItem }> {
    return this.orderItemService.getOrderItem({ id });
  }

  @Delete('/:id')
  deleteOrderItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderItemService.deleteOrderItem(id);
  }

  @Put('/:id')
  updateOrderItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: OrderItemDto,
  ): Promise<{ order_item: IOrderItem }> {
    return this.orderItemService.updateOrderItem(id, body);
  }
}
