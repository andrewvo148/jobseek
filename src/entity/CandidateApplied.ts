import {Column, PrimaryGeneratedColumn, Entity, ManyToOne} from "typeorm";
import {IsEmail, IsNotEmpty, MaxLength} from "class-validator";
import {User} from "./User";
import {Job} from "./Job";



@Entity()
export class CandidateApplied {

    @PrimaryGeneratedColumn()
    id: number;
   
    @ManyToOne(type => User)
    user: User;


    @MaxLength(50)
    @IsEmail()
    @IsNotEmpty()
    @Column({
        length: 50
    })
    email: string;

    @MaxLength(255)
    @IsNotEmpty()
    @Column()
    cvPath: string;


    @IsNotEmpty()
    @ManyToOne(type => Job, job => job.candidateApplieds,{
        nullable: false
    })
    job: Job;
    

    @Column({
        type: 'date'
    })
    applyDatedAt: Date
}