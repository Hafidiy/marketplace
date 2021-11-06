import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Product } from './models/product.entity';
import { ProductCharacteristic } from './models/product_characteristic.entity';
import { ProductImagesDto } from './models/product_images.dto';
import { ProductImage } from './models/product_images.entity';
import { ProductService } from './product.service';

@Injectable()
export class ProductPropertyService {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductCharacteristic)
    private readonly productCharacteristicRepository: Repository<ProductCharacteristic>,
  ) {}

  async addCharacteristics(id: number, data) {
    await this.clearCharacteristics(id);

    const { product } = await this.productService.getProduct(id);

    const { category } = await this.categoryService.getCategory(
      product.category.id,
    );

    for (let i = 0; i < category.characteristics.length; i++) {
      const c = category.characteristics[i];
      const foundIndex = c.values.findIndex(
        (cv) => cv.id === parseInt(data[c.key]),
      );

      if (data[c.key] && foundIndex !== -1) {
        const characteristic = new ProductCharacteristic();
        characteristic.key = c.key;
        characteristic.value = c.values[foundIndex];
        characteristic.product = product;
        await characteristic.save();
      }
    }

    return { product };
  }

  async clearCharacteristics(id: number) {
    const { product } = await this.productService.getProduct(id);

    for (let i = 0; i < product.characteristics.length; i++) {
      const c = product.characteristics[i];
      await this.productCharacteristicRepository.delete(c.id);
    }
  }

  async addImages(
    id: number,
    { images }: ProductImagesDto,
  ): Promise<{ product: Product }> {
    const { product } = await this.productService.getProduct(id);

    let productImages = [];
    for (let i = 0; i < images.length; i++) {
      const product_image = new ProductImage();
      product_image.url = images[i];
      product_image.product = product;
      await product_image.save();
      productImages.push(product_image);
    }

    return { product };
  }

  async clearImages(id: number): Promise<void> {
    const { product } = await this.productService.getProduct(id);

    for (let i = 0; i < product.images.length; i++) {
      await this.productImageRepository.delete(product.images[i].id);
    }
  }
}
