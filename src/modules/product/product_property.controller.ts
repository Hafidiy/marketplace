import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductImagesDto } from './models/product_images.dto';
import { ProductPropertyService } from './product_property.service';

@Controller('api/products')
export class ProductPropertyController {
  constructor(private productPropertyService: ProductPropertyService) {}

  @Post('characteristics/:id')
  addCharacteristics(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.productPropertyService.addCharacteristics(id, body);
  }

  @Delete('characteristics/:id')
  clearCharacteristics(@Param('id', ParseIntPipe) id: number) {
    return this.productPropertyService.clearCharacteristics(id);
  }

  @Post('images/:id')
  addImages(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductImagesDto,
  ) {
    return this.productPropertyService.addImages(id, body);
  }

  @Delete('images/:id')
  clearImages(@Param('id', ParseIntPipe) id: number) {
    return this.productPropertyService.clearImages(id);
  }
}
