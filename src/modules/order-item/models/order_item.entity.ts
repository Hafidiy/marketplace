import { OrderEntity } from 'src/modules/order/models/order.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_items')
export class OrderItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => OrderEntity, (order) => order.items, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  parent: OrderEntity;

  @Column()
  parentId: number;
}
