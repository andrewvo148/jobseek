import { EntityRepository, Repository } from "typeorm";
import { JobView } from "../entity/JobView";




@EntityRepository(JobView)
export class JobViewRepository extends Repository<JobView> {

}