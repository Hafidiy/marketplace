import { Module } from "@nestjs/common";
import { BrandModule } from "src/modules/brand/brand.module";
import { BrandSeederService } from "./brands.services";

@Module({
    imports: [BrandModule],
    providers: [BrandSeederService],
    exports: [BrandSeederService],
  })
  export class BrandSeederModule {}