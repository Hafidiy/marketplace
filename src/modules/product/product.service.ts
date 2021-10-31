import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './models/product.entity';
import { ProductAdditionalEntity } from './models/product_additional.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductAdditionalEntity)
    private readonly productAdditonalRepositroy: Repository<ProductAdditionalEntity>,
  ) {}

  async getProducts() {
    const products = await this.productRepository.find({
      relations: ['additional'],
    });

    return { products };
  }

  async createProduct(data) {
    let keys = Object.keys(data).filter((e) => e !== 'name');

    const product = new ProductEntity();
    product.name = data.name;
    await product.save();

    const additionals = [];
    keys.map(async (a) => {
      const additional = new ProductAdditionalEntity();
      additional.key = a;
      additional.value = data[a];
      additional.product = product;
      await additional.save();

      additionals.push(additional);
    });

    product.additional = additionals;

    return product;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['additional'],
    });

    if (!product) {
      throw new NotFoundException();
    }

    return { product };
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateProduct(id: number, data) {
    const { product } = await this.getProductById(id);

    if (data.name !== product.name) {
      product.name = data.name;
    }

    product.additional.map(async (e) => {
      await this.productAdditonalRepositroy.delete(e.id);
    });
    delete product.additional;
    await product.save();

    let keys = Object.keys(data).filter((e) => e !== 'name');
    const additionals = [];
    keys.map(async (a) => {
      const additional = new ProductAdditionalEntity();
      additional.key = a;
      additional.value = data[a];
      additional.product = product;
      await additional.save();

      additionals.push(additional);
    });

    product.additional = additionals;
    return product;
  }
}
