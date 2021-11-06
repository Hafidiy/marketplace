import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { CategoryCharacteristic } from './models/category_characteristic.entity';
import { CategoryValue } from './models/category_value.entity';

@Injectable()
export class CategoryCharacteristicService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(CategoryValue)
    private readonly categoryValueRepository: Repository<CategoryValue>,
    @InjectRepository(CategoryCharacteristic)
    private readonly categoryCharacteristicRepository: Repository<CategoryCharacteristic>,
  ) {}

  async addCategoryCharacteristics(id: number, data) {
    const { category } = await this.categoryService.getCategory({ id });

    let keys = Object.keys(data);
    let values: any[] = Object.values(data);

    for (let i = 0; i < values.length; i++) {
      if (!Array.isArray(values[i])) {
        throw new BadRequestException('Values must be an array');
      }
    }

    for (let i = 0; i < keys.length; i++) {
      const categoryCharacteristic = new CategoryCharacteristic();
      categoryCharacteristic.key = keys[i];
      categoryCharacteristic.category = category;
      await categoryCharacteristic.save();
      for (let j = 0; j < values[i].length; j++) {
        const categoryValue = new CategoryValue();
        categoryValue.name = values[i][j];
        categoryValue.categoryCharacteristic = categoryCharacteristic;
        await categoryValue.save();
      }
    }

    return { category };
  }

  async clearCategoryCharacteristics(id: number) {
    const { category } = await this.categoryService.getCategory({ id });

    for (let i = 0; i < category.characteristics.length; i++) {
      for (let j = 0; j < category.characteristics[i].values.length; j++) {
        await this.categoryValueRepository.delete(
          category.characteristics[i].values[j].id,
        );
      }
      await this.categoryCharacteristicRepository.delete(
        category.characteristics[i].id,
      );
    }
  }
}
