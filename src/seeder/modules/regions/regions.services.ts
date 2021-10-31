import { Injectable } from "@nestjs/common";
import { IRegion } from "src/modules/region/models/regoin.interface";
import { RegionService } from "src/modules/region/region.service";
import { initialRegions } from "src/seeder/data/regions";

@Injectable()
export class RegionSeederService {
  constructor(private regionService: RegionService) {}

  async create(): Promise<IRegion[]> {
    const regions: IRegion[] = [];

    for (let i = 0; i < initialRegions.length; i++) {
      // console.log('name: ', initialRegions[i].name);
      try {
        const { region } = await this.regionService.createRegion(
          initialRegions[i],
        );

        // console.log('region: ', region);
        regions.push(region);
      } catch (err) {
        console.log('Error region service', err);
        Promise.reject(err);
      }
    }

    // console.log('regions: ', regions);
    return regions;
  }
}
