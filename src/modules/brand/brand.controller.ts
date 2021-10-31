import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryDto } from '../common/models/query.dto';
import { BrandService } from './brand.service';
import { BrandDto } from './models/brand.dto';
import { IBrand } from './models/brand.interface';

@Controller('api/brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  getBrands(
    @Query() queryDto: QueryDto
  ): Promise<{ brands: IBrand[] }> {
    return this.brandService.getBrands(queryDto);
  }

  @Post()
  createBrand(@Body() body: BrandDto): Promise<{ brand: IBrand }> {
    return this.brandService.createBrand(body);
  }

  @Get('/:id')
  getBrandById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ brand: IBrand }> {
    return this.brandService.getBrand({ id });
  }

  @Delete('/:id')
  deleteBrand(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.brandService.deleteBrand(id);
  }

  @Put('/:id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: BrandDto,
  ): Promise<{ brand: IBrand }> {
    return this.brandService.updateBrand(id, body);
  }
}
