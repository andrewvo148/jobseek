// import { Request, Response, NextFunction, request } from "express";
// import { SecurityUtils, Secured } from "../util/SecurityUtils";
// import { User } from "../entity/User";
// import { getCustomRepository } from "typeorm";
// import { ProfileRepository } from "../repository/ProfileRepository";
// import * as multer from "multer";
// import { validate } from "class-validator";
// import { unlinkSync } from "fs";

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });

// const imageFilter = async (req: Request, file:any, cb: any) => {

//     // accept .doc .docx, .pdf files up to 1MB
//     if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
//         console.log("wrong");
//         return cb(new Error("Error upload cv"), false);
//     }
//     cb(null, true);
// };

// const upload = multer({
//     storage: storage, 
//     fileFilter: imageFilter,
//     limits: { fileSize: 1048576}
//  }).single('file');


// export class ProfileController {

//     private profileRepository = getCustomRepository(ProfileRepository);

//     @Secured(['user'])
//     async get(req: Request, res: Response, next: NextFunction) {
//         try {
//             let user = <User> SecurityUtils.getCurrentUser(req);
//             let profile = await this.profileRepository.findOne({user: user});
//             res.json(profile);
//         } catch (e) {
//             res.status(500).json(e);
//         }
//     }


//     @Secured(['user'])
//     async save(req: Request, res: Response, next: NextFunction) {
//         let self = this;
//         let user = <User> SecurityUtils.getCurrentUser(req);
//         upload(req, res, async function (err) {
//             try {

//                 console.log(req.body);
//                  if (err) {
//                      console.log("error");
//                      res.status(400).json(err);
//                      return;
//                  }

//                 // let user = <User> SecurityUtils.getCurrentUser(req);
//                  let profileDB = await self.profileRepository.findOne({user});
//                  profileDB.name = req.body.name;
//                  profileDB.description = req.body.description;
//                  profileDB.cvPath = req.file.path;
//                  let errors = await validate(profileDB);
//                  if (errors.length > 0) {
//                      unlinkSync(request.file.path);
//                      res.status(400).json(errors);
//                  }
//                  await self.profileRepository.save(profileDB);
//                  res.json(profileDB);
               
//             } catch (e) {
//                 unlinkSync(request.file.path);
//                 res.status(500).json(e);
//             }
//         });
       
//     }
// }