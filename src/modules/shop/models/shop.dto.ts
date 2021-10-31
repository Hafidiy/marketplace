import { IsNotEmpty } from "class-validator";

export class ShopDto {
    @IsNotEmpty()
    name: string;
}