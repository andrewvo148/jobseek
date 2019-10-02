import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { UserRepository } from "../repository/UserRepositoty";
import { Secured } from "../util/SecurityUtils";
import { json } from "body-parser";

export class UserController {

    private userRepository = new UserRepository();

    @Secured(['admin'])
    async all(request: Request, response: Response, next: NextFunction) {
        try {
            let users =  await this.userRepository.find();
            response.json(users)
        } catch (e) {
            response.send(500).send("Something were wrong.");
        }
       
    }

    @Secured(['admin'])
    async one(request: Request, response: Response, next: NextFunction) {
        try {
            let user =  await this.userRepository.findOne(request.params.id);
            response.json(user)
        } catch (e) {
            response.send(500).send("Something were wrong.");
        }

    }

    @Secured(['admin'])
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let user =  await this.userRepository.save(request.body);
            response.json(user)
        } catch (e) {
            response.send(500).send("Something were wrong.");
        }
    }

    @Secured(['admin'])
    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            let userToRemove = await this.userRepository.findOne(request.params.id);
            await this.userRepository.remove(userToRemove);
            response.json('');
        } catch (e) {
            response.send(500).send("Something were wrong.");
        }
    }

}