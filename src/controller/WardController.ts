import { getCustomRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { WardRepository } from "../repository/WardRepository";
import { Secured } from "../util/SecurityUtils";
import { validate } from "class-validator";
import { Ward } from "../entity/Ward";
import { District } from "../entity/District";


export class WardController {
    private wardRepository = getCustomRepository(WardRepository);

    async all(req: Request, res: Response, next: NextFunction) {
       return this.wardRepository.all(); 
    }

    @Secured(['admin'])
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            let updated = false;

            let ward = new Ward();
            ward.id = req.body.id;
            ward.code = req.body.code;
            ward.name = req.body.name;
            if (req.body.districtId) {
                let district = new District();
                district.id = req.body.districtId;
                ward.district = district;
            }
            const errors = await validate(ward);
            if (errors.length > 0) {
                console.log(errors);
                res.status(400).json(errors);
                return;
            }
            if (ward.id) {
                updated = true;
            }
            console.log(ward);
            ward = await this.wardRepository.createOrUpdate(ward);
            if (updated) {
                return res.status(200).json(ward);
            }
            return res.status(201).json(ward);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

}