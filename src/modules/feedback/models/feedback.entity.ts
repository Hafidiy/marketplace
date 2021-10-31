import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('feedbacks')
export class FeedbackEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}