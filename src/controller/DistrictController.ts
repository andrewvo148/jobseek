import { getCustomRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { DistrictRepository } from "../repository/DistrictRepository";
import { Secured } from "../util/SecurityUtils";
import { validate } from "class-validator";
import { District } from "../entity/District";
import { Province } from "../entity/Province";
import { ProvinceController } from "./ProvinceController";


export class DistrictController {
    private districtRepository = getCustomRepository(DistrictRepository);

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            let districts = await this.districtRepository.all(); 
            return res.json(districts);
        }
        catch (e) {
            return res.status(500).json(e);
        }
    }

    @Secured(['admin'])
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);

            let updated = false;
            let district = new District();
            district.id = req.body.id;
            district.code = req.body.code;
            district.name = req.body.name;
            if (req.body.provinceId) {
                let province = new Province();
                province.id = req.body.provinceId;
                district.province = province;
            }
        
            const errors = await validate(district);
    
            if (errors.length > 0) {
                console.log(errors);
                res.status(400).json(errors);
                return;
            }
         
            if (district.id) {
                updated = true;
            }
            district = await this.districtRepository.createOrUpdate(district);
            console.log(district);
            if (updated) {
                return res.status(200).json(district);
            }
            return res.status(201).json(district);
        } catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    }

}