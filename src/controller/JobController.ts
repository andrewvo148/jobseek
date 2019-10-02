import { Job } from "../entity/Job";
import { getCustomRepository, TransactionManager } from "typeorm";
import { JobRepository } from "../repository/JobRepository";
import { Secured } from "../util/SecurityUtils";
import {Response, Request, NextFunction, response} from "express";
import { Company } from "../entity/Company";
import { validate } from "class-validator";
import { JobService } from "../service/JobService";
import { District } from "../entity/District";
import { Ward } from "../entity/Ward";
import { Province } from "../entity/Province";
import { JobLocation } from "../entity/JobLocation";
import { StringUtils } from "../util/StringUtils";
import { JobViewRepository } from "../repository/JobViewRepository";


export class JobController {
    private jobService = new JobService();
    private jobRepository = getCustomRepository(JobRepository);
    private jobViewRepository = getCustomRepository(JobViewRepository);

    async search(req: Request, res: Response, next: NextFunction) {
        try {
            let q = req.query.q || '';
            let jobs = await this.jobService.search(q);
            res.json(jobs);
            return;
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }
    async all(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.query);
            let queryStr = req.query.q || '';
            let provinceId = req.query.provinceId;
            let page = req.query.page || 0;
            let size = req.query.size || 20;
            let offset = page * size;
           console.log("page: " +  page + ", size: " + size + ", offset: " + offset);
             let allJobs = await this.jobViewRepository
                 .createQueryBuilder("jobView")
                 .where("to_tsvector(jobView.title || ' ' || jobView.companyName || ' ' jobView.tags) @@" +
                 " to_tsquery(':q')", {q: queryStr})
                 .orderBy("jobView.publishedDated", "DESC")
                 .offset(offset)
                 .limit(size)
                 .getMany();
            // {
            //     where: {
            //     },
            //     relations: [],
            //     skip: page,
            //     take: 20
            // });

            res.json(allJobs);
        } catch (e) {
            res.status(500).json(e)

        }
    }

    @Secured(['employers', 'admin'])
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            let updated = false;
            let job = new Job();
            job.id = req.body.id;
            job.company = new Company(req.body.companyId);
            job.title = req.body.title;
            job.slug = StringUtils.slugify(job.title);
            job.requiremention = req.body.requiremention;
            job.tags = req.body.tags;
            job.incomeType = req.body.incomeType;
            job.description = req.body.description;
            job.salaryMin = req.body.salaryMin;
            job.salaryMax = req.body.salaryMax;
            job.salaryType = req.body.salaryType;
            job.jobLocations = req.body.jobLocations;
            job.currency = req.body.currency;
            job.isPublished = req.body.isPublished;
            console.log(job);

            const errors = await validate(job);
            if (errors.length > 0) {
                console.log(errors);
                res.status(400).json(errors);
                return;
            }
            let jobLocations = [];
            req.body.jobLocations.forEach(location => {
                let jobLocation = new JobLocation();
                jobLocation.province = new Province(location.provinceId);
                jobLocation.district = new District(location.districtId);
                jobLocation.ward = new Ward(location.wardId);
                jobLocation.job = new Job();
                jobLocations.push(jobLocation);
            });
            job.jobLocations = jobLocations;

            if (job.id) {
                updated = true;
            }
            job = await this.jobService.createOrUpdate(job);
            console.log(job);
            if (updated) {
                return res.status(200).json(job);
            }
            return res.status(201).json(job);

        } catch (e) {
            res.status(500).json(e)
        }
    }

}