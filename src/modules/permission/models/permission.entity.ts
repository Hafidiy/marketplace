import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;
}