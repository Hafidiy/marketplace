import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDto } from '../common/models/query.dto';
import { BrandDto } from './models/brand.dto';
import { BrandEntity } from './models/brand.entity';
import { IBrand, IBrandPaginated } from './models/brand.interface';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async getBrands(query?: QueryDto): Promise<IBrandPaginated> {
    let { page, count } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    if(count && typeof count === 'string'){
      count = parseInt(count)
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [brands, total] = await this.brandRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return { brands, meta: {
      total,
      page,
      last_page: Math.ceil(total / count)
    } };
  }

  async createBrand(
    data: BrandDto,
  ): Promise<{ brand: IBrand }> {
    const { name } = data;

    try {
      const newBrand = await this.brandRepository.save({ name });
      return { brand: newBrand };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Brand already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getBrand(condition): Promise<{ brand: IBrand }> {
    const brand = await this.brandRepository.findOne(condition);

    if(!brand){
        throw new NotFoundException();
    }

    return { brand };
  }

  async deleteBrand(id: number): Promise<void> {
    const result = await this.brandRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateBrand(
    id: number,
    data: BrandDto,
  ): Promise<{ brand: IBrand }> {
    const { name } = data;

    const { brand } = await this.getBrand({ id });

    try {
      const updatedBrand = await this.brandRepository.save({
        ...brand,
        name,
      });

      return { brand: updatedBrand };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Brand already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
