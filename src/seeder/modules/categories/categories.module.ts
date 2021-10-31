import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/modules/category/category.module';
import { CategorySeederService } from './categories.services';

@Module({
  imports: [CategoryModule],
  providers: [CategorySeederService],
  exports: [CategorySeederService],
})
export class CategorySeederModule {}
