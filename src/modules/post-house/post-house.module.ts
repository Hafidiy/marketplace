import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostHouseEntity } from './models/post_house.entity';
import { PostHouseController } from './post-house.controller';
import { PostHouseService } from './post-house.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostHouseEntity])],
  controllers: [PostHouseController],
  providers: [PostHouseService],
  exports: [PostHouseService],
})
export class PostHouseModule {}
