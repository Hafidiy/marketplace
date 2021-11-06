import { CategoryValue } from 'src/modules/category/models/category_value.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_characteristics')
export class ProductCharacteristic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @OneToOne(() => CategoryValue)
  @JoinColumn()
  value: CategoryValue;

  @ManyToOne(() => Product, (product) => product.characteristics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
