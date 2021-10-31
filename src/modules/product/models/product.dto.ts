import { IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    name: string;

    // @IsNotEmpty()
    // brand: string;

    // @IsNotEmpty()
    // category: string;
}