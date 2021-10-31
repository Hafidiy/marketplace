import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('regions')
export class RegionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}