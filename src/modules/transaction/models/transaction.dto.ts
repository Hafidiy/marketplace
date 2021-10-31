import { IsNotEmpty } from "class-validator";

export class TransactionDto {
    @IsNotEmpty()
    name: string;
}