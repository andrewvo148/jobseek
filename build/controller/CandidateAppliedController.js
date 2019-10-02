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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var typeorm_1 = require("typeorm");
var CandidateAppliedRepository_1 = require("../repository/CandidateAppliedRepository");
var CandidateApplied_1 = require("../entity/CandidateApplied");
var Job_1 = require("../entity/Job");
var class_validator_1 = require("class-validator");
var fs_1 = require("fs");
var ProfileRepository_1 = require("../repository/ProfileRepository");
var SecurityUtils_1 = require("../util/SecurityUtils");
var JobRepository_1 = require("../repository/JobRepository");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var imageFilter = function (req, file, cb) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // accept .doc .docx, .pdf files up to 1MB
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            console.log("wrong");
            return [2 /*return*/, cb(new Error("Error upload cv"), false)];
        }
        cb(null, true);
        return [2 /*return*/];
    });
}); };
var upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 1048576 }
}).single('file');
var CandidateAppliedController = /** @class */ (function () {
    function CandidateAppliedController() {
        this.candidateAppliedRepository = typeorm_1.getCustomRepository(CandidateAppliedRepository_1.CandidateAppliedRepository);
        this.profileRepository = typeorm_1.getCustomRepository(ProfileRepository_1.ProfileRepository);
        this.jobRepository = typeorm_1.getCustomRepository(JobRepository_1.JobRepository);
    }
    CandidateAppliedController.prototype.get = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var self, candidateApplied, user, profile, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        candidateApplied = new CandidateApplied_1.CandidateApplied();
                        user = SecurityUtils_1.SecurityUtils.getCurrentUser(req);
                        console.log(user);
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.profileRepository.findOne({ user: user })];
                    case 2:
                        profile = _a.sent();
                        candidateApplied.email = profile.email;
                        candidateApplied.name = profile.name;
                        candidateApplied.cvPath = profile.cvPath;
                        candidateApplied.description = profile.description;
                        _a.label = 3;
                    case 3:
                        console.log(candidateApplied);
                        res.json(candidateApplied);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        res.status(500).json(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CandidateAppliedController.prototype.save = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var self, user;
            return __generator(this, function (_a) {
                self = this;
                user = SecurityUtils_1.SecurityUtils.getCurrentUser(request);
                upload(request, response, function (err) {
                    return __awaiter(this, void 0, void 0, function () {
                        var candidateApplied, profile, errors, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 5, , 6]);
                                    console.log("no error upload");
                                    if (err) {
                                        console.log("error");
                                        response.status(400).json(err);
                                        return [2 /*return*/];
                                    }
                                    candidateApplied = new CandidateApplied_1.CandidateApplied();
                                    candidateApplied.job = request.body.jobId ? new Job_1.Job(request.body.jobId) : null;
                                    candidateApplied.name = request.body.name;
                                    candidateApplied.cvPath = request.file.path;
                                    candidateApplied.email = request.body.email;
                                    candidateApplied.description = request.body.description;
                                    console.log(candidateApplied);
                                    profile = void 0;
                                    if (!user) return [3 /*break*/, 2];
                                    return [4 /*yield*/, self.profileRepository.findOne({ user: user })];
                                case 1:
                                    profile = _a.sent();
                                    candidateApplied.user = user;
                                    candidateApplied.email = profile.email;
                                    // update profile
                                    profile.name = candidateApplied.name;
                                    profile.cvPath = candidateApplied.cvPath;
                                    profile.description = candidateApplied.description;
                                    _a.label = 2;
                                case 2:
                                    console.log(candidateApplied);
                                    return [4 /*yield*/, class_validator_1.validate(candidateApplied)];
                                case 3:
                                    errors = _a.sent();
                                    if (errors.length > 0) {
                                        console.log("error validated");
                                        // delete file
                                        fs_1.unlinkSync(request.file.path);
                                        response.status(400).json(errors);
                                        return [2 /*return*/];
                                    }
                                    if (profile) {
                                        self.profileRepository.save(profile);
                                    }
                                    // console.log(candidateApplied);
                                    return [4 /*yield*/, self.candidateAppliedRepository.save(candidateApplied)];
                                case 4:
                                    // console.log(candidateApplied);
                                    _a.sent();
                                    response.json(candidateApplied);
                                    return [3 /*break*/, 6];
                                case 5:
                                    e_2 = _a.sent();
                                    //  if (request.file) {
                                    //     unlinkSync(request.file.path);
                                    //  }
                                    response.status(500).json(e_2);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    CandidateAppliedController.prototype.jobApplied = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, jobsApplied, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = SecurityUtils_1.SecurityUtils.getCurrentUser(req);
                        return [4 /*yield*/, this.candidateAppliedRepository.find({
                                relations: ['job', 'job.jobLocations'],
                                where: { user: user }
                            })];
                    case 1:
                        jobsApplied = _a.sent();
                        // let jobsApplied = this.jobRepository.createQueryBuilder("job")
                        //     .where("job.id = ")
                        res.json(jobsApplied);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.status(500).json(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        SecurityUtils_1.Secured(['user']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], CandidateAppliedController.prototype, "save", null);
    __decorate([
        SecurityUtils_1.Secured(['user']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], CandidateAppliedController.prototype, "jobApplied", null);
    return CandidateAppliedController;
}());
exports.CandidateAppliedController = CandidateAppliedController;
//# sourceMappingURL=CandidateAppliedController.js.map