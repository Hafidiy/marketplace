import { Category } from 'src/modules/category/models/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCharacteristic } from './product_characteristic.entity';
import { ProductImage } from './product_images.entity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  index_image: string;

  @Column()
  price: number;

  @Column()
  sale: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  rating: number;

  @OneToMany(
    () => ProductCharacteristic,
    (characteristic) => characteristic.product,
    { cascade: true },
  )
  characteristics: ProductCharacteristic[];

  @OneToMany(
    () => ProductImage,
    (image) => image.product,
    { cascade: true },
  )
  images: ProductImage[];

  @ManyToOne(() => Category, (category) => category.characteristics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;
}
