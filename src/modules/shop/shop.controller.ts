import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { QueryDto } from "../common/models/query.dto";
import { ShopDto } from "./models/shop.dto";
import { IShop } from "./models/shop.interface";
import { ShopService } from "./shop.service";

@Controller('api/shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  getShops(
    @Query() queryDto: QueryDto
  ): Promise<{ shops: IShop[] }> {
    return this.shopService.getShops(queryDto);
  }

  @Post()
  createShop(@Body() body: ShopDto): Promise<{ shop: IShop }> {
    return this.shopService.createShop(body);
  }

  @Get('/:id')
  getShopById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ shop: IShop }> {
    return this.shopService.getShop({ id });
  }

  @Delete('/:id')
  deleteShop(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.shopService.deleteShop(id);
  }

  @Put('/:id')
  updateShop(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ShopDto,
  ): Promise<{ shop: IShop }> {
    return this.shopService.updateShop(id, body);
  }
}
