import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak' }
    )
    password: string;
}