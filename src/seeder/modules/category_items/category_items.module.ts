import { Module } from "@nestjs/common";
import { CategoryItemModule } from "src/modules/category-item/category-item.module";
import { CategoryItemSeederService } from "./category_items.services";

@Module({
    imports: [CategoryItemModule],
    providers: [CategoryItemSeederService],
    exports: [CategoryItemSeederService],
  })
  export class CategoryItemSeederModule {}
  