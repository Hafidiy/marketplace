import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { QueryDto } from "../common/models/query.dto";
import { RegionDto } from "./models/region.dto";
import { IRegion } from "./models/regoin.interface";
import { RegionService } from "./region.service";

@Controller('api/regions')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get()
  getRegions(
    @Query() queryDto: QueryDto
  ): Promise<{ regions: IRegion[] }> {
    return this.regionService.getRegions(queryDto);
  }

  @Post()
  createRegion(@Body() body: RegionDto): Promise<{ region: IRegion }> {
    return this.regionService.createRegion(body);
  }

  @Get('/:id')
  getRegionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ region: IRegion }> {
    return this.regionService.getRegion({ id });
  }

  @Delete('/:id')
  deleteRegion(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.regionService.deleteRegion(id);
  }

  @Put('/:id')
  updateRegion(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RegionDto,
  ): Promise<{ region: IRegion }> {
    return this.regionService.updateRegion(id, body);
  }
}
