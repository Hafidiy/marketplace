import { CategoryEntity } from 'src/modules/category/models/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category_items')
export class CategoryItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => CategoryEntity, (category) => category.items, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  parent: CategoryEntity;

  @Column()
  parentId: number;
}
