import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];
}
