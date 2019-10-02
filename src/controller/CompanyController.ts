import { getCustomRepository, UpdateDateColumn, Tree } from "typeorm";
import { Company } from "../entity/Company";
import { Request, Response, NextFunction } from "express";
import { SecurityUtils, Secured } from "../util/SecurityUtils";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { CompanyRepository } from "../repository/CompanyRepository";
import { Province } from "../entity/Province";
import { District } from "../entity/District";
import { Ward } from "../entity/Ward";
import * as multer from "multer";

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const imageFilter = async (req: Request, file:any, cb: any) => {

    // accept .doc .docx, .pdf files up to 1MB
    if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
        console.log("wrong");
        return cb(new Error("Error upload cv"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage, 
    fileFilter: imageFilter,
    limits: { fileSize: 1048576}
 }).single('file');


export class CompanyController {
    private companyRepository = getCustomRepository(CompanyRepository);

    async getBySlug(req: Request, res: Response, next: NextFunction) {
        try {
            let slug = req.params.slug;
            let c = await this.companyRepository.findOne({slug: slug});
            res.json(c);
            return;
        }
        catch (e) {
            res.status(500).json({status: 500, message: e.message})
        }
    }
    async all(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.query);
            let page = req.query.page || 0;
            let size = req.query.size || 20;
            let offset = page * size;
           console.log("page: " +  page + ", size: " + size + ", offset: " + offset);
             let allCompanys = await this.companyRepository.find(
           
            {
                where: {
                    isPublished: true,
                },
                 relations: ['province', 'district', 'ward'], 
                // 'jobLocations.district', 'jobLocations.ward'],
                skip: page,
                take: 20
            });

            res.json(allCompanys);
        } catch (e) {
            res.status(500).json({status: 500, message: e.message})
        }
    }

    @Secured(['employers', 'admin'])
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let updated = false;
            let company = new Company();
            company.user = <User> SecurityUtils.getCurrentUser(request);
           
            console.log(SecurityUtils.getCurrentUser(request));
            console.log(request.user);
            company.id = request.body.id;
            company.name = request.body.name;
            company.country = request.body.country;
            company.startOfWeekWork = request.body.startOfWeekWork;
            company.endOfWeekWork = request.body.endOfWeekWork;

            company.serviceType = request.body.serviceType;
            company.description = request.body.description;
            company.size = request.body.size;
            company.province = new Province(request.body.provinceid);
            company.district = new District(request.body.districtid);
            company.ward = new Ward(request.body.wardid);
            company.street = request.body.street;
            company.skills = request.body.skills;
            company.topbenefit = request.body.topbenefit;
            company.benefit = request.body.benefit;
            const errors =  await validate(company);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            if (company.id) {
                updated = true;
            }
            company = await this.companyRepository.createOrUpdate(company);
            if (updated) {
                response.status(200).json(company);
                return;
            }
            response.status(201).json(company);
        } catch (e) {
            response.status(500).json({status: 500, message: e.getMessage()});
        }
     
    }


    // @Secured(['employers', 'admin'])
    // async uploadLogo(request: Request, response: Response, next: NextFunction) {
    //     let self = this;

    //      upload(request, response, async function (err) {
    //          try {
    //              console.log(request.body);
    //              if (err) {
    //                  console.log("error");

    //                  response.status(400).json(err);
    //                  return;
    //              }


    //              console.log(candidateApplied);
    //              let errors = await validate(candidateApplied);
    //              if (errors.length > 0) {
    //                  // delete file
    //                  console.log(request.file.path);
    //                  await unlinkSync(request.file.path);
    //                  response.status(400).json(errors);
    //                  return;
    //              }

    //              // console.log(candidateApplied);
    //              response.json(candidateApplied);
    //          } catch (e) {
    //              await unlinkSync(request.file.path);
    //              response.status(500).json(e);
    //          }

    //     });
    // }

    async topCompany(request: Request, response: Response, next: NextFunction) {
        try {

        } catch (e) {
            
        }
    }
}