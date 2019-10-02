import { Repository, EntityRepository } from "typeorm";
import { Job } from "../entity/Job";
import { JobLocation } from "../entity/JobLocation";

@EntityRepository(JobLocation)
export class JobLocationRepository extends Repository<JobLocation> {

    async createOrUpdate(jobLocation: JobLocation) {
        return this.save(jobLocation);
    }
    async findsByJob(job: Job) {
        return this.find({ job : job})
    }
    async removeJL(id: number) {
        let one = await this.findOne({id: id});
        return this.remove(one);
    }
}