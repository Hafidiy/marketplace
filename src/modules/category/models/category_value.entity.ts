import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryCharacteristic } from './category_characteristic.entity';

@Entity('category_values')
export class CategoryValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(
    () => CategoryCharacteristic,
    (categoryCharacteristic) => categoryCharacteristic.values,
  )
  categoryCharacteristic: CategoryCharacteristic;
}
