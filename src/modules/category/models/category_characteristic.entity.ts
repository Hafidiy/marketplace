import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { CategoryValue } from './category_value.entity';

@Entity('category_characteristics')
export class CategoryCharacteristic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @OneToMany(() => CategoryValue, (value) => value.categoryCharacteristic)
  values: CategoryValue[];

  @ManyToOne(() => Category, (category) => category.characteristics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;
}
