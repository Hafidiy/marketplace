import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('brands')
export class BrandEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}