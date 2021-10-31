import { IsNotEmpty, IsOptional } from "class-validator";

export class QueryDto {
    @IsOptional()
    @IsNotEmpty()
    page: number;

    @IsOptional()
    @IsNotEmpty()
    count: number;
}