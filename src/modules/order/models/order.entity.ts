import { OrderItemEntity } from 'src/modules/order-item/models/order_item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => OrderItemEntity, (order_item) => order_item.parent, {
    eager: true,
  })
  items: OrderItemEntity[];
}
