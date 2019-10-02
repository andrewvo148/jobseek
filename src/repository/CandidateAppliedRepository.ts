import { Repository, EntityRepository } from "typeorm";
import { CandidateApplied } from "../entity/CandidateApplied";

@EntityRepository(CandidateApplied)
export class CandidateAppliedRepository extends Repository<CandidateApplied> {
}