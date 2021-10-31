import { IsNotEmpty } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    password?: string;

    role_id?: number;
}