import { Job } from "../entity/Job";
import { TransactionRepository, Transaction } from "typeorm";
import { JobRepository } from "../repository/JobRepository";
import { JobLocationRepository } from "../repository/JobLocationRepository";
import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: 'http://localhost:9200' });

export class JobService {

    @Transaction()
    async createOrUpdate(job: Job, @TransactionRepository() jobRepository?: JobRepository, @TransactionRepository() jobLocationRepository?: JobLocationRepository) {
        await jobRepository.save(job);
        // remove jobLocations
        let jobL = await jobLocationRepository.findsByJob(job);
         await jobLocationRepository.remove(jobL);
        job.jobLocations.forEach(jl => {
            jl.job.id = job.id;
         });

        await jobLocationRepository.save(job.jobLocations);
        return job;

    }  

    async search(q: string) {
        const { body } = await client.search({
            index: 'job',
            body: {
                query: {
                    multi_match: {
                        query: q,
                        fields: [ "title", "description"]
                    }
                }
            }
        });
        return body;

    }
}