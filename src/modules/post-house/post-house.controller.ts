import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostHouseDto } from "./models/post_house.dto";
import { IPostHouse } from "./models/post_house.interface";
import { PostHouseService } from "./post-house.service";

@Controller('api/post-houses')
export class PostHouseController {
  constructor(private postHouseService: PostHouseService) {}

  @Get()
  getPostHouses(): Promise<{ postHouses: IPostHouse[] }> {
    return this.postHouseService.getPostHouses();
  }

  @Post()
  createPostHouse(@Body() body: PostHouseDto): Promise<{ postHouse: IPostHouse }> {
    return this.postHouseService.createPostHouse(body);
  }

  @Get('/:id')
  getPostHouseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ postHouse: IPostHouse }> {
    return this.postHouseService.getPostHouse({ id });
  }

  @Delete('/:id')
  deletePostHouse(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postHouseService.deletePostHouse(id);
  }

  @Put('/:id')
  updatePostHouse(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PostHouseDto,
  ): Promise<{ postHouse: IPostHouse }> {
    return this.postHouseService.updatePostHouse(id, body);
  }
}
