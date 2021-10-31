import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/modules/product/models/product.entity";
import { ProductSeederService } from "./products.services";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductSeederService],
    exports: [ProductSeederService],
  })
  export class ProductSeederModule {}