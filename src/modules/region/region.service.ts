import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryDto } from "../common/models/query.dto";
import { RegionDto } from "./models/region.dto";
import { RegionEntity } from "./models/region.entity";
import { IRegion, IRegionPaginated } from "./models/regoin.interface";

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async getRegions(query?: QueryDto): Promise<IRegionPaginated> {
    let { page, count } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    if(count && typeof count === 'string'){
      count = parseInt(count)
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [regions, total] = await this.regionRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return { regions, meta: {
      total,
      page,
      last_page: Math.ceil(total / count)
    } };
  }

  async createRegion(
    data: RegionDto,
  ): Promise<{ region: IRegion }> {
    const { name } = data;

    try {
      const newRegion = await this.regionRepository.save({ name });
      return { region: newRegion };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Region already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getRegion(condition): Promise<{ region: IRegion }> {
    const region = await this.regionRepository.findOne(condition);

    if(!region){
        throw new NotFoundException();
    }

    return { region };
  }

  async deleteRegion(id: number): Promise<void> {
    const result = await this.regionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateRegion(
    id: number,
    data: RegionDto,
  ): Promise<{ region: IRegion }> {
    const { name } = data;

    const { region } = await this.getRegion({ id });

    try {
      const updatedRegion = await this.regionRepository.save({
        ...region,
        name,
      });

      return { region: updatedRegion };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Region already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
