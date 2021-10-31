import { IsNotEmpty } from 'class-validator';
import { IOrder } from 'src/modules/order/models/order.interface';

export class OrderItemDto {
  @IsNotEmpty()
  name: string;

  parent: IOrder;
}
