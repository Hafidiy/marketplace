import { CategoryItemEntity } from 'src/modules/category-item/models/category_item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    (type) => CategoryItemEntity,
    (category_item) => category_item.parent,
    { eager: true },
  )
  items: CategoryItemEntity[];
}
