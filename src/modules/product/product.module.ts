import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { Product } from './models/product.entity';
import { ProductCharacteristic } from './models/product_characteristic.entity';
import { ProductImage } from './models/product_images.entity';
import { ProductPropertyController } from './product_property.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPropertyService } from './product_property.service';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([Product, ProductCharacteristic, ProductImage]),
  ],
  controllers: [ProductController, ProductPropertyController],
  providers: [ProductService, ProductPropertyService],
})
export class ProductModule {}
