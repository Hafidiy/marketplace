import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryCharacteristicService } from './category_characteristic.service';

@Controller('api/categories/characteristics')
export class CategoryCharacteristicController {
  constructor(
    private categoryCharacteristicService: CategoryCharacteristicService,
  ) {}

  @Post(':id')
  addCategoryCharacteristics(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ) {
    return this.categoryCharacteristicService.addCategoryCharacteristics(
      id,
      body,
    );
  }

  @Delete(':id')
  clearCategoryCharacteristics(@Param('id', ParseIntPipe) id: number) {
    return this.categoryCharacteristicService.clearCategoryCharacteristics(id);
  }
}
