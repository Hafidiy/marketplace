import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('products_additional')
export class ProductAdditionalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne(() => ProductEntity, (product) => product.additional, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  product: ProductEntity;
}
