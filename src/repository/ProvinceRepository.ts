import { Repository, EntityRepository } from "typeorm";
import { Province } from "../entity/Province";

@EntityRepository(Province)
export class ProvinceRepository extends Repository<Province> {
    
    async all() {
        return this.find();
    }
    async one(id: null) {
        return this.findOne(id);
    }
    async createOrUpdate(province: Province) {
        return this.save(province);
    }
}