import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Timestamp, JoinColumn } from "typeorm";
import { IsNotEmpty, MaxLength, IsArray, ArrayMinSize, ArrayMaxSize } from "class-validator";

import { Company } from "./Company";
import { JobLocation } from "./JobLocation";
import { type } from "os";
import { CandidateApplied } from "./CandidateApplied";

export enum Currency {
    USD = "usd",
    VND = "vnd"
}
export enum SalaryType {
    ATTRACTIVE = "attractive",
    NEGOTIATION = "negotiation"
}
export enum IncomeType {
    GROSS = "gross",
    NET = "net"
}
@Entity()
export class Job {

    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @MaxLength(255)
    @Column({
        length: 255
    })
    title: string;

    @Column({
        length: 255
    })
    slug: string;

    @IsArray()
    @ArrayMinSize(1)
    @Column("simple-array")
    tags: string[];

    @IsNotEmpty()
    @Column({
        type: 'text'
    })
    description: string;

    @IsNotEmpty()
    @Column({
        type: 'text'
    })
    requiremention: string;


    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @OneToMany(type => JobLocation, jobLocation => jobLocation.job, {
        cascade: false,
        persistence: false, 
        
    })
    jobLocations: JobLocation[];

    
    @ManyToOne(type => Company, company => company.jobs, {
        nullable: false
    })
    @JoinColumn({ name: "companyId" })
    company: Company;

    @OneToMany(type => CandidateApplied, candidateApplied => candidateApplied.job)
    candidateApplieds: CandidateApplied[];


    @Column({
        type: "timestamp with time zone",
        nullable: true
    })
    publishedDated: Timestamp;

    @Column({
        default: false
    })
    isPublished: boolean;

    @Column({
        type: "numeric",
        precision: 11, 
        scale: 2,
        nullable: true
    })
    salaryMin: number;

    @Column({
        type: "numeric",
        precision: 11, 
        scale: 2,
        nullable: true
    })
    salaryMax: number;


    @IsNotEmpty()
    @Column({
        type: "enum",
        enum: IncomeType
        })
    incomeType: IncomeType;

    @Column({
        type: "enum",
        enum: SalaryType,
        nullable: true
        })
    salaryType: SalaryType;

    @Column({
        type: "enum",
        enum: Currency,
        nullable: true
    })
    currency: Currency;


    constructor(id?: number) {
        this.id = id;
    }

    

}