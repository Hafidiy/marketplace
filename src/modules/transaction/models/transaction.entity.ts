import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}