import { Injectable } from "@nestjs/common";
import { BrandService } from "src/modules/brand/brand.service";
import { IBrand } from "src/modules/brand/models/brand.interface";
import { initialBrands } from "src/seeder/data/brands";

@Injectable()
export class BrandSeederService {
  constructor(private brandService: BrandService) {}

  async create(): Promise<IBrand[]> {
    const brands: IBrand[] = [];

    for (let i = 0; i < initialBrands.length; i++) {
      // console.log('name: ', initialBrands[i].name);
      try {
        const { brand } = await this.brandService.createBrand(
          initialBrands[i],
        );

        // console.log('brand: ', brand);
        brands.push(brand);
      } catch (err) {
        console.log('Error brand service', err);
        Promise.reject(err);
      }
    }

    // console.log('brands: ', brands);
    return brands;
  }
}
