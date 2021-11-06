import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ProductDto } from './models/product.dto';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService {
  staticKeys = [
    'id',
    'name',
    'index_image',
    'price',
    'sale',
    'quantity',
    'description',
    'rating',
    'images',
  ];
  // feedbacks,
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<{ products: Product[] }> {
    const products = await this.productRepository.find({
      relations: [
        'characteristics',
        'characteristics.value',
        'images',
        'category',
      ],
    });

    return { products };
  }

  async createProduct(data: ProductDto): Promise<{ product: Product }> {
    const {
      name,
      index_image,
      price,
      sale,
      quantity,
      description,
      categoryId,
    } = data;

    const { category } = await this.categoryService.getCategory({
      id: categoryId,
    });

    const product = new Product();
    product.name = name;
    product.index_image = index_image;
    product.price = price;
    product.sale = sale;
    product.quantity = quantity;
    product.description = description;
    product.rating = 1;
    product.category = category;
    await product.save();

    return { product };
  }

  async getProduct(condition): Promise<{ product: Product }> {
    const product = await this.productRepository.findOne(condition, {
      relations: [
        'characteristics',
        'characteristics.value',
        'images',
        'category',
      ],
    });

    if (!product) {
      throw new NotFoundException();
    }

    return { product };
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateProduct(
    id: number,
    data: ProductDto,
  ): Promise<{ product: Product }> {
    const { product } = await this.getProduct(id);

    const {
      name,
      index_image,
      price,
      sale,
      quantity,
      description,
      categoryId,
    } = data;

    const { category } = await this.categoryService.getCategory({
      id: categoryId,
    });

    product.name = name;
    product.index_image = index_image;
    product.price = price;
    product.sale = sale;
    product.quantity = quantity;
    product.description = description;
    product.category = category;
    await product.save();

    return { product };
  }
}
