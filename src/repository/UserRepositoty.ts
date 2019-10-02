import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findOneByEmail(email: string) {
        return this.findOne({email});
    }

    async findOneByEmailAndActived(email: string) {
        return this.findOne({email: email, isActive: true});
    }
    async findOneByActiveCode(code: string) {
        return this.findOne({activeCode: code});
    }
   
    // private userRepository = getRepository(User);

    // async all() {
    //     return this.userRepository.find();
    // }

    // async one(id: number) {
    //     return this.userRepository.findOne(id);
    // }

    // async save(user: User) {
    //     return this.userRepository.save(user);
    // }

    // async remove(id: number) {
    //     let userToRemove = await this.userRepository.findOne(id);
    //     await this.userRepository.remove(userToRemove);
    // }
    
}