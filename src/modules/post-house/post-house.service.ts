import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostHouseDto } from "./models/post_house.dto";
import { PostHouseEntity } from "./models/post_house.entity";
import { IPostHouse } from "./models/post_house.interface";

@Injectable()
export class PostHouseService {
  constructor(
    @InjectRepository(PostHouseEntity)
    private readonly postHouseRepository: Repository<PostHouseEntity>,
  ) {}

  async getPostHouses(): Promise<{ postHouses: IPostHouse[] }> {
    const postHouses = await this.postHouseRepository.find();

    return { postHouses };
  }

  async createPostHouse(
    data: PostHouseDto,
  ): Promise<{ postHouse: IPostHouse }> {
    const { name } = data;

    try {
      const newPostHouse = await this.postHouseRepository.save({ name });
      return { postHouse: newPostHouse };
    } catch (err) {
      console.log('err: ', err);
      if (err.code === '23505') {
        throw new ConflictException('PostHouse already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getPostHouse(condition): Promise<{ postHouse: IPostHouse }> {
    const postHouse = await this.postHouseRepository.findOne(condition);

    if(!postHouse){
        throw new NotFoundException();
    }

    return { postHouse };
  }

  async deletePostHouse(id: number): Promise<void> {
    const result = await this.postHouseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updatePostHouse(
    id: number,
    data: PostHouseDto,
  ): Promise<{ postHouse: IPostHouse }> {
    const { name } = data;

    const { postHouse } = await this.getPostHouse({ id });

    try {
      const updatedPostHouse = await this.postHouseRepository.save({
        ...postHouse,
        name,
      });

      return { postHouse: updatedPostHouse };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('PostHouse already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
