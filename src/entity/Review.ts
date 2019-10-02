import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    title: string;


    @Column({
        type: "enum",
        enum: [1, 2, 3, 4, 5]
    })
    star: number;

    
    
}