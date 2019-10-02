import { EntityRepository, Repository } from "typeorm";
import { Company } from "../entity/Company";


@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

    async createOrUpdate(company: Company) {
        return this.save(company);
    }
}