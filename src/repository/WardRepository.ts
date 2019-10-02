import { Repository, EntityRepository } from "typeorm";
import { Ward } from "../entity/Ward";

@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {
    
    async all() {
        return this.find();
    }
    async one(id: null) {
        return this.findOne(id);
    }
    async createOrUpdate(ward: Ward) {
        return super.save(ward);
    }
}