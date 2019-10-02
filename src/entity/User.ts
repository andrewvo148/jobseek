import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsEmail, IsNotEmpty, IsBoolean} from "class-validator";

export enum UserRole {
    ADMIN = "admin",
    EMPLOYERS = "employers",
    USER = "user"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsEmail()
    @Column({
        length: 100
    })
    email: string;

    @Column({
        length:60
    })
    passwordHashed: string;

    @Column({
        nullable: true
    })
    activeCode: string;

    @Column({
        nullable: true
    })
    isEmployers: boolean;

    @IsNotEmpty()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column({
        default: false
    })
    isActive: boolean;

    @Column({
        nullable: true
    })
    cvPath: string;

    constructor(id?: number) {
        this.id = id;
    }

}
