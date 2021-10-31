import { Module } from "@nestjs/common";
import { RegionModule } from "src/modules/region/region.module";
import { RegionSeederService } from "./regions.services";

@Module({
    imports: [RegionModule],
    providers: [RegionSeederService],
    exports: [RegionSeederService],
  })
  export class RegionSeederModule {}