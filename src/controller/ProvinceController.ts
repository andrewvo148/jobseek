import { getCustomRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { ProvinceRepository } from "../repository/ProvinceRepository";
import { Secured } from "../util/SecurityUtils";
import { validate } from "class-validator";
import { Province } from "../entity/Province";


export class ProvinceController {
    private provinceRepository = getCustomRepository(ProvinceRepository);

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            let provinces = await this.provinceRepository.all();
            res.json(provinces);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    @Secured(['admin'])
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            let updated = false;
            let province = new Province();
            province.id = req.body.id;
            province.code = req.body.code;
            province.name = req.body.name;
            const errors = await validate(province);
    
            if (errors.length > 0) {
                console.log(errors);
                res.status(400).json(errors);
                return;
            }
            if (province.id) {
                updated = true;
            }
            province = await this.provinceRepository.createOrUpdate(province);
            console.log(province);
            if (updated) {
                res.status(200).json(province);
            }
            return res.status(201).json(province);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

}