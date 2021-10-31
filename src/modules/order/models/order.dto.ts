import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];
}
