import { Repository, EntityRepository } from "typeorm";
import { District } from "../entity/District";

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {
    
    async all() {
        return this.find();
    }
    async one(id: null) {
        return this.findOne(id);
    }
    async createOrUpdate(district: District) {
        return super.save(district);
    }
}