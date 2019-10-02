import { getRepository, getCustomRepository } from "typeorm";
import { User, UserRole } from "../entity/User";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repository/UserRepositoty";
import { Secured, SecurityUtils } from "../util/SecurityUtils";

export class AccountController {
    private userRepository = getCustomRepository(UserRepository);

    @Secured([UserRole.USER])
    async get(req: Request, response: Response, next: NextFunction) {
        try {
            let u = SecurityUtils.getCurrentUser;
            let activeCode = req.query.code;
            let user = await this.userRepository.findOneByActiveCode(activeCode);
            if (!user) {
                response.send("No user with this active code or user has actived!.");
                return;
            }
            user.activeCode = null;
            user.isActive = true;
            response.send("");
        } catch (e) {
            response.status(500).json(e);
        }
    }

}