import { Repository, EntityRepository } from "typeorm";
import { Job } from "../entity/Job";

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {

    async createOrUpdate(job: Job) {
        return this.save(job);
    }
}