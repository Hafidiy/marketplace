import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class ProductImagesDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  images: string[];
}
