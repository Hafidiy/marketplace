import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Delete,
  ParseIntPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductDto } from './models/product.dto';
import { ProductInterceptor } from './product.interceptor';
import { ProductService } from './product.service';

@UseInterceptors(ProductInterceptor)
@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  createProduct(@Body() body: ProductDto) {
    return this.productService.createProduct(body);
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Put('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductDto,
  ) {
    return this.productService.updateProduct(id, body);
  }
}
