import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Province } from "./Province";
import { Ward } from "./Ward";
import { District } from "./District";
import { Job } from "./Job";

export enum ServiceType {
    PRODUCT = "product",
    OUTSOURCING = "outsourcing"
} 
export enum Size {
    SIZE1 = "<50",
    SIZE2 = "50-100",
    SIZE3 = "100-200",
    SIZE4 = ">1000"
}
export enum DayOfWeek {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}
@Entity()
export class Company {

    constructor(id?: number) {
        this.id = id;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @Column({
        length: 100
    })
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @Column()
    slug: string;

    @IsNotEmpty()
    @MaxLength(255)
    @Column()
    title: string;

    @IsNotEmpty()
    @Column({
        type: "enum",
        enum: ServiceType
    })
    serviceType: ServiceType;

    @IsNotEmpty()
    @Column({
        type: "enum",
        enum: Size
    })
    size: Size;
    
    @Column({
        nullable: true
    })
    logo: string;


    @Column({
        nullable: true
    })
    banner: string;
    
    @IsNotEmpty()
    @MaxLength(20)
    @Column({
        length: 20
    })
    country: string;


    @Column({
        default: false
    })
    overtime: boolean;

    @IsNotEmpty()
    @Column("text")
    description: string;


    @OneToMany(type => Job, job => job.company)
    jobs: Job[];

    @ManyToOne(type => Province)
    province: Province;

    @ManyToOne(type => District)
    district: District
   
    @ManyToOne(type => Ward)
    ward: Ward;

    @IsNotEmpty()
    @MaxLength(255)
    @Column({
        length: 255
    })
    street: string;

    @Column({
        type: "simple-array",
        nullable: true}
        )
    skills: string[];


    @Column({
        nullable: true
    })
    topbenefit: string;


    @Column({
        type: 'text'
    })
    benefit: string;

    @Column({
        type: 'enum',
        enum: DayOfWeek,
        default: DayOfWeek.MONDAY
    })
    startOfWeekWork: string;

    @Column({
        type: 'enum',
        enum: DayOfWeek,
        default: DayOfWeek.FRIDAY
    })
    endOfWeekWork: string;
}