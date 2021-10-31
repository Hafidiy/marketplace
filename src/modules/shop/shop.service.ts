import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryDto } from "../common/models/query.dto";
import { ShopDto } from "./models/shop.dto";
import { ShopEntity } from "./models/shop.entity";
import { IShop, IShopPaginated } from "./models/shop.interface";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async getShops(query?: QueryDto): Promise<IShopPaginated> {
    let { page, count } = query || {};

    if(page && typeof page === 'string'){
      page = parseInt(page);
    }

    if(count && typeof count === 'string'){
      count = parseInt(count)
    }

    page = page && page > 1 ? page : 1;
    count = count && count > 1 ? count : 10;

    const [shops, total] = await this.shopRepository.findAndCount({
      take: count,
      skip: (page - 1) * count,
    });

    return { shops, meta: {
      total,
      page,
      last_page: Math.ceil(total / count)
    } };
  }

  async createShop(
    data: ShopDto,
  ): Promise<{ shop: IShop }> {
    const { name } = data;

    try {
      const newShop = await this.shopRepository.save({ name });
      return { shop: newShop };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('Shop already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getShop(condition): Promise<{ shop: IShop }> {
    const shop = await this.shopRepository.findOne(condition);

    if(!shop){
        throw new NotFoundException();
    }

    return { shop };
  }

  async deleteShop(id: number): Promise<void> {
    const result = await this.shopRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateShop(
    id: number,
    data: ShopDto,
  ): Promise<{ shop: IShop }> {
    const { name } = data;

    const { shop } = await this.getShop({ id });

    try {
      const updatedShop = await this.shopRepository.save({
        ...shop,
        name,
      });

      return { shop: updatedShop };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Shop already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
