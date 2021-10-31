import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('post_houses')
export class PostHouseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}