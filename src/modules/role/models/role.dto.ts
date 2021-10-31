import { IsArray, IsNotEmpty } from "class-validator";

export class RoleDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsArray()
    permissions: number[];
}