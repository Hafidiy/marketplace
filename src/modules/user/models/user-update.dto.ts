import { IsNotEmpty } from "class-validator";

export class UserUpdateInfoDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;
}

export class UserUpdatePasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    new_password: string;
}