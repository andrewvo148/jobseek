import { EINPROGRESS } from "constants";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsEmail, IsEmpty, IsNotEmpty, Max, MaxLength } from "class-validator";
import { District } from "./District";



@Entity()
export class Ward {


    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @MaxLength(20)
    @Column({
        length: 20,
        unique: true
    })
    code: string;

    @IsNotEmpty()
    @MaxLength(50)
    @Column({
        length: 50
    })
    name: string;

    @ManyToOne(type => District)
    district: District;

    constructor(id?: number, code?: string, name?: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}