import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './models/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryCharacteristic } from './models/category_characteristic.entity';
import { CategoryValue } from './models/category_value.entity';
import { CategoryCharacteristicController } from './category_characteristic.controller';
import { CategoryCharacteristicService } from './category_characteristic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategoryCharacteristic, CategoryValue]),
  ],
  controllers: [CategoryController, CategoryCharacteristicController],
  providers: [CategoryService, CategoryCharacteristicService],
  exports: [CategoryService, CategoryCharacteristicService],
})
export class CategoryModule {}
