import { IsNotEmpty } from "class-validator";

export class PostHouseDto {
    @IsNotEmpty()
    name: string;
}