import { Product } from 'src/modules/product/models/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { CategoryCharacteristic } from './category_characteristic.entity';

@Entity('categories')
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren({ cascade: true })
  children: Category[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Category;

  @OneToMany(
    () => CategoryCharacteristic,
    (characteristic) => characteristic.category,
    { cascade: true },
  )
  characteristics: CategoryCharacteristic[];

  @OneToMany(
    () => Product,
    (product) => product.category,
    { cascade: true },
  )
  products: Product[];
}
