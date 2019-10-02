import { Request, NextFunction, Response } from "express";
import * as multer from "multer";

import {getCustomRepository} from "typeorm";
import {CandidateAppliedRepository} from "../repository/CandidateAppliedRepository";
import {CandidateApplied} from "../entity/CandidateApplied";
import {validate} from "class-validator";
import { SecurityUtils } from "../util/SecurityUtils";
import { extname } from "path";
import { Job } from "../entity/Job";





export class CandidateAppliedController {


    private storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "public/uploads/")
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        },
    });
    private candidateAppliedRepository  = getCustomRepository(CandidateAppliedRepository);
    
    // async get(req: Request, res: Response, next: NextFunction) {
    //     let self = this;
    //     try {
    //         let candidateApplied = new CandidateApplied();
    //         let user = SecurityUtils.getCurrentUser(req);
    //         console.log(user);
    //         if (user) {
    //             let profile = await this.profileRepository.findOne({user});
    //             candidateApplied.email = profile.email;
    //             candidateApplied.name = profile.name;
    //             candidateApplied.cvPath = profile.cvPath;
    //             candidateApplied.description = profile.description;
    //         }
    //         console.log(candidateApplied);
    //         res.json(candidateApplied);
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // }

     async save(request: Request, response: Response, next: NextFunction) {
        try {
            let self = this;
            let up = multer({ 
                storage : this.storage,
                fileFilter: function(request, file, callback) {
                    let ext = extname(file.originalname);
                    console.log(ext);
                    if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.gif' && ext != '.jpeg') {
                        return callback(new Error("Type file not allowed"), false);
                    }
                    callback(null, true)
                }
            
            }).single('cvPath');
        
             up(request, response, function(err) {
                if (err) {
                    response.status(400).json({code: "INVALID", message: err.message})
                    return;
                }
                console.log(request.file);
                let candidateApplied = new CandidateApplied();
                candidateApplied.email = request.body.email;
                if  (request.file) {
                    candidateApplied.cvPath =request.file.path;
                }
                if (request.body.jobId) {
                    candidateApplied.job = new Job(request.body.jobId);
    
                }
                candidateApplied.applyDatedAt = new Date();
               
                console.log(request.file);
                validate(candidateApplied).then((errors) => {
                    if (errors.length > 0) {
                        response.status(400).json({code: 'error', message: errors});
                        return
                    }
                    self.candidateAppliedRepository.save(candidateApplied).then(c => {
                        response.status(201).json(c);
                    }).catch(e => response.status(500).json({status: 500, message: e.message}));
                   
                }).catch(e => response.status(500).json({status: 500, message: e.message}));
              
               
            });
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});

        }
      
        
    }
    //     let self = this;
    //     let user = SecurityUtils.getCurrentUser(request);
    //      upload(request, response, async function (err) {
    //          try {
    //              console.log("no error upload");
    //              if (err) {
    //                  console.log("error");
    //                  response.status(400).json(err);
    //                  return;
    //              }
                 
    //              let candidateApplied = new CandidateApplied();
    //              candidateApplied.job = request.body.jobId ? new Job(request.body.jobId) : null;
    //              candidateApplied.name = request.body.name;
    //              candidateApplied.cvPath = request.file.path;
    //              candidateApplied.email = request.body.email;
    //              candidateApplied.description = request.body.description;

    //              console.log(candidateApplied);
    //              let profile;
    //              if (user) {
    //                     profile = await self.profileRepository.findOne({user});
    //                     candidateApplied.user = user;
    //                     candidateApplied.email = profile.email;

    //                     // update profile
    //                     profile.name = candidateApplied.name;
    //                     profile.cvPath = candidateApplied.cvPath;
    //                     profile.description = candidateApplied.description;
            
    //              }
    //              console.log(candidateApplied);
    //              let errors = await validate(candidateApplied);
    //              if (errors.length > 0) {
    //                  console.log("error validated");
    //                  // delete file
    //                  unlinkSync(request.file.path);
    //                  response.status(400).json(errors);
    //                  return;
    //              }
    //              if (profile) {
    //                  self.profileRepository.save(profile);
    //              }
    //               // console.log(candidateApplied);
    //               await self.candidateAppliedRepository.save(candidateApplied);
    //              response.json(candidateApplied);
    //          } catch (e) {
    //             //  if (request.file) {
    //             //     unlinkSync(request.file.path);
    //             //  }
    //              response.status(500).json(e);
    //          }

    //     });
     //}

    // @Secured(['user'])
    // async jobApplied(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         let user = SecurityUtils.getCurrentUser(req);
    //         // let jobsApplied = this.jobRepository.find({
    //         //     where: {
    //         //         user: user
    //         //     },
    //         //     relations: ['candidateApplieds']
    //         // })
    //         let jobsApplied = await this.candidateAppliedRepository.find({
    //             relations: ['job', 'job.jobLocations'],
    //             where: { user: user}
    //         });
    //         // let jobsApplied = this.jobRepository.createQueryBuilder("job")
    //         //     .where("job.id = ")
    //         res.json(jobsApplied);
    //     } catch (e) {
    //         res.status(500).json(e);
    //     }
    // }
    
}


