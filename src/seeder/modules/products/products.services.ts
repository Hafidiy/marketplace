import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/modules/product/models/product.entity";
import { Repository } from "typeorm";
import { initialProducts } from "../../data/products";

@Injectable()
export class ProductSeederService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  create(): Array<Promise<ProductEntity>> {
    return initialProducts.map(async ({ name }) => {
      try{
        const foundProduct = await this.productRepository.findOne({ name })

        if(foundProduct) {
          return Promise.resolve(null)
        }

        const product = new ProductEntity()
        product.name = name;
        await product.save();

        return Promise.resolve(product);
      } catch(err) {
        console.log('Error products service', err);
        Promise.reject(err)
      }
    });
  }
}