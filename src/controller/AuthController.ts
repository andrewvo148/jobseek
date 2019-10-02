import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repository/UserRepositoty";
import { validate, IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { EmailSevice } from "../service/EmailService";
import { readFileSync } from "fs";
import { join } from "path"
export class UserLogin {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class AuthController {
    private userRepo = getCustomRepository(UserRepository);
    private emailService = new EmailSevice();
    async login(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
            let user = new UserLogin();
            user.email = request.body.email;
             user.password = request.body.password;
            const errors = await validate(user);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            let u = await this.userRepo.findOneByEmailAndActived(user.email);
            console.log(u)
            if (u == null) {
                response.status(400).json({code: 'error', message: 'The email not right'});
                return;
            }
            const match = await bcrypt.compare(user.password, u.passwordHashed);
            if (match) { //login
                delete u.password
                let token = sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                    data: u
                }, "GcsVmCWMefaNKdFtKLxmnckpfDU=" );
                response.json({code: 'successs', access_token: token});
            } else {
                response.status(400).json({code: 'error', message: 'The password not right'});
                return;
            } 

        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
            let user = new User();
            user.name = request.body.name;
            user.email = request.body.email;
            user.password = request.body.password;
            const errors = await validate(user)
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            let u = await this.userRepo.findOneByEmail(user.email)
            if (u) {
                return response.status(409).json({error: 'Email exitst'});
            }

            let hash = await bcrypt.hash(user.password, 10)
            user.passwordHashed = hash
            delete user.password;
            let subject = user.email + ", please confirm your email address";
            let content = readFileSync(join(__dirname, 'register-tmp.html'), { encoding: 'utf8'});
            this.emailService.sendEmail(user.email, subject, content);
            user.isActive = true;
            await self.userRepo.save(user)
            return response.status(201).json('')
            } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
       
    }

     async active(req: Request, response: Response, next: NextFunction) {
        try {
            let activeCode = req.query.key;
            let user = await this.userRepo.findOneByActiveCode(activeCode);
            if (!user) {
                response.send("No user with this active code or user has actived!.");
                return;
            }
            user.activeCode = null;
            user.isActive = true;
            this.userRepo.save(user);
            response.send("");
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
                }
    }


   async logout(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }
}