import { Injectable } from "@nestjs/common";
import { IShop } from "src/modules/shop/models/shop.interface";
import { ShopService } from "src/modules/shop/shop.service";
import { initialShops } from "src/seeder/data/shops";

@Injectable()
export class ShopSeederService {
  constructor(private shopService: ShopService) {}

  async create(): Promise<IShop[]> {
    const shops: IShop[] = [];

    for (let i = 0; i < initialShops.length; i++) {
      // console.log('name: ', initialShops[i].name);
      try {
        const { shop } = await this.shopService.createShop(
          initialShops[i],
        );

        // console.log('shop: ', shop);
        shops.push(shop);
      } catch (err) {
        console.log('Error shop service', err);
        Promise.reject(err);
      }
    }

    // console.log('shops: ', shops);
    return shops;
  }
}
