import { Module } from "@nestjs/common";
import { ShopModule } from "src/modules/shop/shop.module";
import { ShopSeederService } from "./shops.services";

@Module({
    imports: [ShopModule],
    providers: [ShopSeederService],
    exports: [ShopSeederService],
  })
  export class ShopSeederModule {}