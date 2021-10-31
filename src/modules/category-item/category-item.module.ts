import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryItemController } from './category-item.controller';
import { CategoryItemService } from './category-item.service';
import { CategoryItemEntity } from './models/category_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryItemEntity])],
  controllers: [CategoryItemController],
  providers: [CategoryItemService],
  exports: [CategoryItemService]
})
export class CategoryItemModule {}
