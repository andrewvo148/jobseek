"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Job_1 = require("../entity/Job");
var typeorm_1 = require("typeorm");
var JobRepository_1 = require("../repository/JobRepository");
var SecurityUtils_1 = require("../util/SecurityUtils");
var Company_1 = require("../entity/Company");
var class_validator_1 = require("class-validator");
var JobService_1 = require("../service/JobService");
var District_1 = require("../entity/District");
var Ward_1 = require("../entity/Ward");
var Province_1 = require("../entity/Province");
var JobLocation_1 = require("../entity/JobLocation");
var StringUtils_1 = require("../util/StringUtils");
var JobViewRepository_1 = require("../repository/JobViewRepository");
var JobController = /** @class */ (function () {
    function JobController() {
        this.jobService = new JobService_1.JobService();
        this.jobRepository = typeorm_1.getCustomRepository(JobRepository_1.JobRepository);
        this.jobViewRepository = typeorm_1.getCustomRepository(JobViewRepository_1.JobViewRepository);
    }
    JobController.prototype.all = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var queryStr, provinceId, page, size, offset, allJobs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.query);
                        queryStr = req.query.q;
                        provinceId = req.query.provinceId;
                        page = req.query.page || 0;
                        size = req.query.size || 20;
                        offset = page * size;
                        console.log("page: " + page + ", size: " + size + ", offset: " + offset);
                        return [4 /*yield*/, this.jobViewRepository.find(
                            // .createQueryBuilder("job")
                            // .innerJoinAndSelect("job.company", "company")
                            // .leftJoinAndSelect("job.jobLocations", "jobLocation")
                            // .leftJoinAndSelect("jobLocation.province", "province")
                            // .leftJoinAndSelect("jobLocation.district", "district")
                            // .leftJoinAndSelect("jobLocation.ward", "ward")
                            // .where("job.isPublished = :isPublished", {isPublished: true})
                            // .offset(offset)
                            // .limit(size)
                            // .getMany();
                            {
                                where: {},
                                relations: [],
                                skip: page,
                                take: 20
                            })];
                    case 1:
                        allJobs = _a.sent();
                        res.json(allJobs);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(500).json(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    JobController.prototype.save = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, job, errors, jobLocations_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        updated = false;
                        job = new Job_1.Job();
                        job.id = req.body.id;
                        job.company = new Company_1.Company(req.body.companyId);
                        job.title = req.body.title;
                        job.slug = StringUtils_1.StringUtils.slugify(job.title);
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
                        return [4 /*yield*/, class_validator_1.validate(job)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            console.log(errors);
                            res.status(400).json(errors);
                            return [2 /*return*/];
                        }
                        jobLocations_1 = [];
                        req.body.jobLocations.forEach(function (location) {
                            var jobLocation = new JobLocation_1.JobLocation();
                            jobLocation.province = new Province_1.Province(location.provinceId);
                            jobLocation.district = new District_1.District(location.districtId);
                            jobLocation.ward = new Ward_1.Ward(location.wardId);
                            jobLocation.job = new Job_1.Job();
                            jobLocations_1.push(jobLocation);
                        });
                        job.jobLocations = jobLocations_1;
                        if (job.id) {
                            updated = true;
                        }
                        return [4 /*yield*/, this.jobService.createOrUpdate(job)];
                    case 2:
                        job = _a.sent();
                        console.log(job);
                        if (updated) {
                            return [2 /*return*/, res.status(200).json(job)];
                        }
                        return [2 /*return*/, res.status(201).json(job)];
                    case 3:
                        e_2 = _a.sent();
                        res.status(500).json(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        SecurityUtils_1.Secured(['employers', 'admin']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], JobController.prototype, "save", null);
    return JobController;
}());
exports.JobController = JobController;
//# sourceMappingURL=JobController.js.map