import { EINPROGRESS } from "constants";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsEmpty, IsNotEmpty, Max, MaxLength } from "class-validator";



@Entity()
export class Province {

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

    constructor(id?: number, code?: string, name?: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}