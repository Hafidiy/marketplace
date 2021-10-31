import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductAdditionalEntity } from './product_additional.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ProductAdditionalEntity,
    (additional) => additional.product,
    { cascade: true },
  )
  additional: ProductAdditionalEntity[];
}
