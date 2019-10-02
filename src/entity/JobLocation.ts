import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import { Job } from "./Job";
import { Province } from "./Province";
import { District } from "./District";
import { Ward } from "./Ward";

@Entity()
export class JobLocation {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Job, job => job.jobLocations)
    job: Job;

    @ManyToOne(type => Province)
    province: Province;



    @ManyToOne(type => District)
    district: District;

    @ManyToOne(type => Ward)
    ward: Ward;


    constructor(id?: number, job?: Job, province?: Province, district?: District, ward?: Ward) {
        this.id = id;
        this.job = job;
        this.province = province;
        this.district = district;
        this.ward = ward;
    }

}