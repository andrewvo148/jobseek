import { EINPROGRESS } from "constants";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsEmail, IsEmpty, IsNotEmpty, Max, MaxLength } from "class-validator";
import { Province } from "./Province";

@Entity()
export class District {

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

    @ManyToOne(type => Province)
    province: Province;

    constructor(id?: number, code?: string, name?: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}